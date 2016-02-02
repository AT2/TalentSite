app.filter "skip",
    ->
        (items,count)->
            filtered = items[count..] if items
            
            