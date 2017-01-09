class AddAttachmentToImageContent < ActiveRecord::Migration[5.0]
  def up
    add_attachment :image_contents, :image
  end

  def down
    remove_attachment :image_contents, :image
  end
end
