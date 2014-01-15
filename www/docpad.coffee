# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
	plugins:
		handlebars:
			helpers: 
				#getblock
				allPages: () ->
					return JSON.stringify(@getCollection("html").findAll({isPage:true}))


}

# Export the DocPad Configuration
module.exports = docpadConfig