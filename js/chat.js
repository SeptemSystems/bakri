jQuery(function() {
  jQuery("a#chat_link").click(function(){ 
      jQuery('.live_chat').toggleClass('opened');
      jQuery('body').toggleClass('chat_opened');
  });
});

var me = {};
me.avatar = "images/user-me.jpg";

var you = {};
you.avatar = "images/user-you.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        
        control = '<li style="width:100%">' +
                        '<div class="chat_msj chat_macro">' +
                            '<div class="chat_text chat_text-r">' +
                                '<p>'+ text +'<small>'+date+'</small></p>' +
                            '</div>' +
                            '<div class="chat_avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="chat_msj-rta chat_macro">' +
                            '<div class="chat_avatar" style="padding:0px 10px 0px 0px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +
                            '<div class="chat_text chat_text-l">' +
                                '<p>'+text+' <small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +                            
                  '</li>';
    }
    setTimeout(
        function(){                        
            $(".chat_frame ul").append(control);

        }, time);
    
}

function resetChat(){
    $(".chat_frame ul").empty();
}

$(".chat_box_text").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            $(this).val('');
        }
    }
});

//-- Clear Chat
resetChat();
//-- Print Messages
insertChat("you", "Hello, <br>How can we help you?", 0);  
// insertChat("me", "Hi, Pablo", 1500);

//-- NOTE: No use time on insertChat.