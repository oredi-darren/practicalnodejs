/**
 * Created by darren on 8/22/14.
 */
var app = require('derby').createApp(module);

app.get('/', function (page, mode, _arg, next) {
    var snippetId = model.add('snippets', {
        snippetName: _arg.snippetName,
        code: 'var'
    })

    return page.redirect('/' + snippetId)
})

app.get('/:snippetId', function (page, model, param, next) {
    var snippet = model.at('snippets.' + param.snippetId)
    snippet.subscribe(function (err) {
        if(err) return next(err)
        console.log(snippet.get())
        model.ref('_page.snippet', snippet)
        page.render()
    })
})