class AddAttachmentVideoToVideoContents < ActiveRecord::Migration[5.0]
  def self.up
    add_attachment :video_contents, :video
  end

  def self.down
    remove_attachment :video_contents, :video
  end
end
