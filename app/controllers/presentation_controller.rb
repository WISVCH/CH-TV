class PresentationController < ApplicationController
  def index

  end

  def active_slides
    @slides = Slide.all
    respond_to do |format|
      format.json { render :json => @slides,
                    :include => { :content => { :methods => :resource_url } } }
    end
  end
end
