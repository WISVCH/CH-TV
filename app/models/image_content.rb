class ImageContent < ApplicationRecord
  has_one :slide, as: :content

  has_attached_file :image, styles: { thumb: "240x135#", medium: "960x540#", fullscreen: "1920x1080#" },
                            convert_options: { :thumb => "-strip" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates :image, :attachment_presence => true

  def resource_url
    image.url(:fullscreen)
  end
end
