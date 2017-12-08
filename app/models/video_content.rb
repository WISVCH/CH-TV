class VideoContent < ApplicationRecord
  has_one :slide, as: :content

  has_attached_file :video, styles: { 
    thumb: { :geometry => "240x135#", :format => 'jpg', :time => 1 }
  }

  validates_attachment_content_type :video, content_type: /\Avideo\/.*\z/

  validates :video, :attachment_presence => true

  def resource_url
    video.url
  end
end
