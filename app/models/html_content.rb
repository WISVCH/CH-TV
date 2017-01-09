class HtmlContent < ApplicationRecord
  has_one :slide, as: :content
end
