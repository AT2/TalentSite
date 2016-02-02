app.filter "take",
    ->
        (items,count)->
            filtered = items[0..(count-1)] if items