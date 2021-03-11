require 'compass/import-once/activate' 
# Require any additional compass plugins here. 

# require 'breakpoint' 
# require 'susy' 

# Set this to the root of your project when deployed: 
http_path = "/" 
css_dir = "css" 
sass_dir = "sass" 
images_dir = "images" 
javascripts_dir = "js" 

# You can select your preferred output style here (can be overridden via the command line): 
# output_style = :expanded or :nested or :compact or :compressed 
output_style = :compressed 

# To enable relative paths to assets via compass helper functions. Uncomment: 
relative_assets = true 

# To disable debugging comments that display the original location of your selectors. Uncomment: 
line_comments = false 

# If you prefer the indented syntax, you might want to regenerate this 
# project again passing --syntax sass, or you can uncomment this: 
# preferred_syntax = :sass 
# and then run: 

Encoding.default_external = "utf-8" 
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
sourcemap = true 

css_dir = "css" # by Fire.app 
sass_dir = "sass" # by Fire.app 
images_dir = "images" # by Fire.app 
javascripts_dir = "js" # by Fire.app 
fireapp_coffeescripts_dir = "coffeescripts" # by Fire.app 
fireapp_livescripts_dir = "livescripts" # by Fire.app 
fireapp_minifyjs_on_build = false # by Fire.app 
fireapp_always_report_on_build = true # by Fire.app 
output_style = :compressed # by Fire.app 
relative_assets = true # by Fire.app 
line_comments = false # by Fire.app 
sass_options = {:debug_info=>false} # by Fire.app 
sourcemap = true # by Fire.app 
fireapp_coffeescript_options = {:bare=>false} # by Fire.app 
fireapp_livescript_options = {:bare=>false} # by Fire.app 