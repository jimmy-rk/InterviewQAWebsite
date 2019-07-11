// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
RefreshTable();
//$('#a').summernote();
//$('#an').summernote();
//jQuery.validator.setDefaults({ ignore: ":hidden:not(#a),.note-editable.panel-body" });
//jQuery.validator.setDefaults({ ignore: ":hidden:not(#an),.note-editable.panel-body" });
$('#new').click(function () {

    $('#qa-form').css('display', 'block')
    focusAction('qa-form');
    
   
    //const form=$('<form class="qa-form">')
    //const question = $('<label>QUESTION:  </label><br><textarea rows="4" cols="50" name="question" id="q" required/><br>')
    //const answer = $('<label>ANSWER:  </label> <br><textarea  rows="8" cols="50" name="answer" id="a" required/><br>')
    //const language = $('<label>LANGUAGE:  </label><br><textarea rows="4" cols="50" name="language" id="l" required/><br>')
    //const topic = $('<label>TOPIC:  </label><br><textarea rows="1" cols="50" name="topic" id="t" required/><br>')
    //const create = $('<input type="button" name="create" id="create" value="Create" /><br>')
    //const cancel = $('<input type="button" class="cancel" value="Cancel" />')

    //$('#a').summernote();
    
    //form.append(question)
    //form.append(answer)
    //form.append(language)
    //form.append(topic)
    //form.append(create)
    //form.append(cancel)
    //$('#actionContainer').append(form)
    
})
$('#create').click( function () {   

    if ($('#qa-form').valid()) {
        
        $.ajax({
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            url: `http://interviewqa-api.jimmyrk.com/api `,
            data: JSON.stringify({

                question: $.trim($("#q").val()),
                answer: $.trim($("#a").val()),
                language: $.trim($("#l").val()),
                topic: $.trim($("#t").val())
            }),
            success: function (response) {

                alert('record created')
                $('#q').val('')
                $('#a').val('')
                $('#l').val('')
                $('#t').val('')
                $('#qa-form').css('display', 'none')
                focusAction('tableContainer');
                $('#tableContainer').empty();
                RefreshTable();

            }
        })
    }
})


$('#update').click ( function () {

 
    const id = $("#id").val()
    const question = $("#qu").val()
    const answer = $("#an").val()
    const language = $("#la").val()
    const topic = $("#to").val()

    if ($('#edit-qa-form').valid()) {
        
        $.ajax({
            type: 'PUT',
            contentType: "application/json;charset=utf-8",
            url: `http://interviewqa-api.jimmyrk.com/api/${id} `,
            data: JSON.stringify({
                id: id,
                question: $.trim($("#qu").val()),
                answer: $.trim($("#an").val()),
                language: $.trim($("#la").val()),
                topic: $.trim($("#to").val())
            }),
            success: function (response) {
                alert('record updated')
                $('#id').val('')
                $('#qu').val('')
                $('#an').val('')
                $('#la').val('')
                $('#to').val('')
                $('#edit-qa-form').css('display', 'none')
                focusAction('tableContainer');
                $('#tableContainer').empty();
                RefreshTable();

            }
        })
    }
})

$('#tableContainer').on('click', '.delete', function () {

    const name = $.trim(this.name).toLowerCase();
    var confirmation = confirm("Are you sure you want to remove the record?");
    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: `http://interviewqa-api.jimmyrk.com/api/${name} `,
            success: function (response) {
                alert('record deleted')
                $('#tableContainer').empty();
                RefreshTable();
            }
        })
    }

})

$('#tableContainer').on('click', '.edit', function () {


    const id = $.trim(this.name)

    $('#id').val($.trim(this.name)) 
    $('#qu').val($(`#${id}-question`).html()) 
    $('#an').val($(`#${id}-answer`).html()) 
    $('#la').val($(`#${id}-language`).html())
    $('#to').val($(`#${id}-topic`).html())  

    //const form = $(`<form class="qa-form">
    //                 <label>ID:  </label><br><textarea rows="1" cols="4" name="question" id="id" disabled>${id}</textarea><br>
    //                 <label>QUESTION:  </label><br><textarea rows="4" cols="50" name="question" id="q" required>${q}</textarea><br>
    //                 <label>ANSWER:  </label><br><textarea rows="8" cols="50" name="answer" id="a" required>${a}</textarea><br>
    //                 <label>LANGUAGE:  </label><br><textarea rows="1" cols="50" name="language" id="l"  required>${l}</textarea><br>
    //                 <label>TOPIC:  </label><br><textarea rows="1" cols="50" name="topic" id="t"  required>${t}</textarea><br>

    //                 <input type="button" name="update" id="update" value="Update" /><br>
    //                <input type="button" class="cancel" value="Cancel" />
    //                </form>
    //            `)

    //$('#actionContainer').append(form)
    
    $('#edit-qa-form').css('display', 'block')
    focusAction('edit-qa-form')

})

$('#create-cancel').click(function () {
    $('#q').val('')
    $('#a').val('')
    $('#l').val('')
    $('#t').val('')
    $('#qa-form').css('display', 'none')
    focusAction('tableContainer');
});
$('#update-cancel').click(function () {
    $('#id').val('')
    $('#qu').val('')
    $('#an').val('')
    $('#la').val('')
    $('#to').val('')
    $('#edit-qa-form').css('display', 'none')
    focusAction('tableContainer');
});

function RefreshTable() {

    $.ajax({
        url: 'http://interviewqa-api.jimmyrk.com/api',
        success: function (response) {
            const header = $(`<table id='tab1' border="1">
                <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Language</th>
                    <th>Topic</th>
                    <th>Action</th>
                </tr>
            </table>`)
            $.each(response, function (key, val) {
                const row = $(`<tr>
                <td id=${val.id}-id>${val.id}</td>
                <td id=${val.id}-question>${val.question}</td> 
                <td id=${val.id}-answer>${val.answer}</td>
                <td id=${val.id}-language>${val.language}</td>
                <td id=${val.id}-topic>${val.topic}</td>
                <td>
                <button name=${val.id} class='delete'>Delete</button>
                <button name=${val.id} class='edit'>Edit</button>
                </td>
                </tr>`)
                header.append(row)
                $('#tableContainer').append(header)
            })
        }
    })
}

$('#qa-form').validate(
    { // initialize the plugin

        rules: {

            question: {
                required: true,
            },
            answer: {
                required: true,
            },
            language: {
                required: true,
            },
            topic: {
                required: true,
            }
        }
    });
$('#edit-qa-form').validate(
    { // initialize the plugin

        rules: {

            question: {
                required: true,
            },
            answer: {
                required: true,
            },
            language: {
                required: true,
            },
            topic: {
                required: true,
            }
        }
    });


function focusAction(element) {
    $('html,body').animate({
        scrollTop: $('#' + element).offset().top - 100
    }, 1000)
}