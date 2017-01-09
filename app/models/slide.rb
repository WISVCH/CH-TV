class Slide < ApplicationRecord
  belongs_to :content, polymorphic: true, dependent: :destroy
end
