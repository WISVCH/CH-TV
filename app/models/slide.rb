class Slide < ApplicationRecord
  belongs_to :content, polymorphic: true, dependent: :destroy

  before_save :default_values

  def default_values
    self.display_time ||= 8
  end
end
