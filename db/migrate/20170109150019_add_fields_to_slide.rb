class AddFieldsToSlide < ActiveRecord::Migration[5.0]
  def change
    change_table :slides do |t|
      t.string :name
      t.integer :content_id
      t.string :content_type
      t.date :start_date
      t.date :end_date
      t.integer :display_time
    end
  end
end
