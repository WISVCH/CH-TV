FROM ruby:2.4.1

RUN apt-get update -qq && apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for capybara-webkit
RUN apt-get install -y libqt4-webkit libqt4-dev xvfb

# for a JS runtime
RUN apt-get install -y nodejs

# for Imagemagick
RUN apt-get install -y imagemagick

ENV APP_HOME /myapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install
CMD npm install

ADD . $APP_HOME

WORKDIR $APP_HOME
CMD rake db:migrate
CMD bin/rails server --port 3000 --binding=0.0.0.0

EXPOSE 3000
