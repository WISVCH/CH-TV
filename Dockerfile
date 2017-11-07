# Pull base image.
FROM ruby:2.4.1

RUN apt-get update -qq && apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for capybara-webkit
RUN apt-get install -y libqt4-webkit libqt4-dev xvfb

# for Imagemagick
RUN apt-get install -y imagemagick

# for a JS runtime
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash
RUN apt-get install -y nodejs

ENV APP_HOME /tvsysteem
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
ADD . $APP_HOME

# install dependencies
RUN bundle install
RUN npm install

CMD bin/rails server --port 3000 --binding 0.0.0.0

EXPOSE 3000
