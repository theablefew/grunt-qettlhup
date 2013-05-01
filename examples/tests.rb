require 'sauce/capybara'
require 'pathname'
require 'json'
require 'bundler/setup'

Bundler.require(:default, :test)

$USE_BROWSER = ARGV.last || :windows7chrome

class CapybaraTestCase < Test::Unit::TestCase
  include Capybara::DSL
  include DriverHelpers

  def setup
    use($USE_BROWSER)
    Capybara.app_host = environment
    Capybara.default_wait_time = 10
    Capybara.run_server = false
  end

end

class ConnectionCheckTest < CapybaraTestCase
  def test_connection
    @host = HostSession.new(:host, self)
    @host.visit "http://www.google.com/"
    @host.action do
      page.has_css?("span", text: "Google Search")
    end
  end
end

module DriverHelpers

  def use_configed(chosen_browser)
    supportedBrowsers = JSON.parse(Pathname.new(File.dirname(__FILE__) + '/BrowserList.json').read)

    supportedBrowsers.each do |os, browserHash|
      browserHash.each do |browserName, browserArray|
        browserArray.each do |browser|
          ident = "#{os}#{browserName}#{browser['short_version']}".downcase.gsub(' ', '').to_sym

          if ident == chosen_browser

            Sauce.config do |c|
              c[:browsers] = [[os, browserName, browser['short_version']]]
              c[:name] = "#{os} - #{browserName} - #{browser['short_version']}"
            end

            Capybara.register_driver ident do |app|
              Sauce::Capybara::Driver.new(app)
            end

            break
          end
        end
      end
    end


    Capybara.current_driver = chosen_browser
    Capybara.javascript_driver = chosen_browser
  end

  def use(browser)
    if respond_to? "use_#{browser}"
      public_send "use_#{browser}"
    else
      use_configed(browser.to_sym)
    end
  end

end