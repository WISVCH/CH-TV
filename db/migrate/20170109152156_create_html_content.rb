class CreateHtmlContent < ActiveRecord::Migration[5.0]
  def change
    create_table :html_contents do |t|
      t.string :code
    end
  end
end
