class CreateSlides < ActiveRecord::Migration[5.0]
  def change
    create_table :slides do |t|

      t.timestamps
    end
  end
end
