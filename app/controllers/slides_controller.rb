class SlidesController < ApplicationController
  before_action :set_slide, only: [:show, :edit, :update, :destroy]
  before_action :load_all_slides

  # GET /slides
  # GET /slides.json
  def index

  end

  # GET /slides/1
  # GET /slides/1.json
  def show
  end

  # GET /slides/new
  def new
    @slide = Slide.new
  end

  # GET /slides/1/edit
  def edit
  end

  # POST /slides
  # POST /slides.json
  def create
    @slide = Slide.new(slide_params)
    if params['slide'].present?
      if params['slide']['image'].present?
        @slide.content = ImageContent.new(image: params['slide']['image'])
      elsif params['slide']['video'].present?
        @slide.content = VideoContent.new(video: params['slide']['video'])
      end
    end

    respond_to do |format|
      if @slide.content.save && @slide.save 
        format.html { redirect_to edit_slide_path(@slide), notice: 'Slide was successfully created.' }
        format.json { render :show, status: :created, location: @slide }
      else
        format.html { render :new }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /slides/1
  # PATCH/PUT /slides/1.json
  def update

    if params['slide'].present?
      if params['slide']['image'].present?
        @slide.content = ImageContent.new(image: params['slide']['image'])
      elsif params['slide']['video'].present?
        @slide.content = VideoContent.new(video: params['slide']['video'])
      end
      @slide.content.save
    end

    respond_to do |format|
      if @slide.update(slide_params)
        format.html { redirect_to edit_slide_path(@slide), notice: 'Slide was successfully updated.' }
        format.json { render :show, status: :ok, location: @slide }
      else
        format.html { render :edit }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1
  # DELETE /slides/1.json
  def destroy
    @slide.destroy
    respond_to do |format|
      format.html { redirect_to slides_url, notice: 'Slide was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_slide
      @slide = Slide.find(params[:id])
    end

    def load_all_slides
      @slides = Slide.all
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def slide_params
      params.fetch(:slide, {}).permit(:content, :display_time)
    end
end
