class CreateVideoContents < ActiveRecord::Migration[5.1]
  def change
    create_table :video_contents do |t|

      t.timestamps
    end
  end
end
