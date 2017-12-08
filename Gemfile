source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.0beta1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Boostrap CSS framework
gem 'bootstrap', '~> 4.0.0.alpha6'

# This is necessary for bootstrap tooltips
source 'https://rails-assets.org' do
  gem 'rails-assets-tether', '>= 1.3.3'
end

# Use Paperclip for image storage
gem "paperclip", "~> 5.0.0"

# Ruby readline because the rails console wouldn't work for me
gem 'rb-readline'

# Nested layouts
gem 'nestive', '~> 0.6.0'

# For video thumbnails
gem 'paperclip-av-transcoder'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use sprockets beta for ES6 (babel-transpiler) & npm package (commoner) support
gem 'sprockets', '3.7.0'
gem 'babel-transpiler'
gem 'sprockets-commoner'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
