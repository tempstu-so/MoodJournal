"use strict";

/* SOME CONSTANTS */
let endpoint01 = "https://misdemo.temple.edu/auth";
let endpoint02 = "https://mis3502-burgos.com/8221";
let endpoint03 = "https://misdemo.temple.edu/corsfix?uid=tul47074&url=https://emoji-api.com/emojis";
let access_key= "access_key=4ae634f94003028e4b5e73e890388c8caf04ba57";
let endpoint04= "https://misdemo.temple.edu/corsfix?uid=tul47074&url=http://www.boredapi.com/api";


/* SUPPORTING FUNCTIONS */


let getBoredApi= function(){
	
	$.ajax({
		"url": endpoint04+'/activity',
		"method": "GET",
		success:function(result){
			console.log(result);
			$("#act").html(result["activity"]);
			console.log(result["activity"]);
			
		},
		error: function(data){
			console.log(data);
		}
	});
}




let emotionController= function(highlight,thechoice){
	
	$('button').removeClass('button1');
	$(highlight).addClass('button1');
	$('#emotion').val(thechoice);
	$('#journalowner').val(localStorage.usertoken)
};




let addSelectedMood = function(){
    let the_serialized_data = $("#form-emoji").serialize();

    $.ajax({
        url: endpoint02+'/select/',
        data:the_serialized_data,
        method:"GET",
        success: function(result){
            console.log(result)
            if (result[1] == 0.5){
                $("#response").removeClass();
				$("#response").addClass("alert alert-success");
                $("#response").html(result[0]);
            }
            else if(result[1] == 1){
                $("#response").removeClass();
                $("#response").addClass("alert alert-success");
				$("#response").html(result[0]);
            }
            else if (result[1]== 1.5){
                $("#response").removeClass();
				$("#response").addClass("alert alert-success");
				$("#response").html(result[0]);
			}
			else if (result[1] == 2){
                $("#response").removeClass();
				$("#response").addClass("alert alert-success");
				$("#response").html(result[0]);

        }}, 
        error: function(data){
            console.log(data); 
        },
    });
    
};

let Histor = function(){
	
	emotionController();
	let the_serialized_data = $("#form-emoji").serialize();
	console.log(the_serialized_data);

	$.ajax({
		url: endpoint02+'/history/',
		data:the_serialized_data,
		method:"GET",
		success: function(result){
			console.log(result)
			$("#emotion_data").html(result);
			$('button').addClass('button1');
		}, 
		error: function(data){
			console.log(data); 
		}
	});
	
};


let addJournalController= function(){
	let the_serialized_data = $("#writing").serialize()+"&journalowner="+localStorage.usertoken;
	

	console.log(the_serialized_data);
	$.ajax({
		"url": endpoint02+"/journals",
		"data": the_serialized_data,
		"method": "POST",
		success:function(result){
			console.log(result);
			journalEntryController();
			$(".content-wrapper").hide();
			$("#div-past").show();
			$("#journalTitle").val("");
			$("#journalEntry").val("");
		},
		error: function(data){
			console.log(data);
		}
	});
}



let emojiController= async function(){
	
	await $.ajax({
		"url": endpoint03 +"/grinning-face-with-big-eyes?"+access_key,
		"method": "GET",
		"success": function(result){
			console.log(result);
			
			$("#happybtn").html(result[0]["character"]);
			
		},
		"error": function(data){
			console.log(data);
		}
	});

	await $.ajax({
		"url": endpoint03 +"/neutral-face?"+access_key,
		"method": "GET",
		"success": function(result){
			console.log(result);
			
			$("#neutralbtn").html(result[0]["character"]);
			
		},
		"error": function(data){
			console.log(data);
		}
	});

	await $.ajax({
		"url": endpoint03 +"/face-with-rolling-eyes?"+access_key,
		"method": "GET",
		"success": function(result){
			console.log(result);
			
			$("#annoybtn").html(result[0]["character"]);
			
		},
		"error": function(data){
			console.log(data);
		}
	});

	await $.ajax({
		"url": endpoint03 +"/angry-face?"+access_key,
		"method": "GET",
		"success": function(result){
			console.log(result);
			
			$("#angrybtn").html(result[0]["character"]);
			
		},
		"error": function(data){
			console.log(data);
		}
	});
};

let journalEntryController = function(){
	//flush out / overwrite what is in the task table right now
	//$("#table-tasks").html(" <tr><th>Task Name</th></tr>");
	// make an ajax call to get the tasks
	let the_serialized_data = "journalowner="+localStorage.usertoken;
	console.log(the_serialized_data); //the data I will send to the API
	$.ajax({
		"url": endpoint02 +"/journals",
		"data" :the_serialized_data,
		"method": "GET",
		"success": function(result){
			console.log(result);//the data I got back
			//write a loop
			if(result.length == 0){
				$("#noEntry").removeClass();
				$("#noEntry").addClass("alert alert-success");
				$("#noEntry").html("No Journal Entries!");
				$("#table-tasks").html("");
			}else{
				$("#noEntry").removeClass();
				$("#noEntry").html("");
				$("#table-tasks").html(" <tr><th>Entry Titles</th></tr>");
				
				for(let i = 0; i< result.length; i++){

				let tablerow = "<tr><td>";//+ result[i]["taskname"] + "</td></tr>";
				tablerow = tablerow+result[i]["journaltitle"];
				tablerow = tablerow + '<a href="#" onclick="detailController(' + result[i]["journalid"]+ ')" class="btn btn-default float-right"  >Read</a>';
				tablerow=tablerow+"</td></tr>";

				//tablerow=tablerow + "<a href='#' onclick='detailController(3)' class='btn-default float-right'>Detail</a>"
				$("#table-tasks").append(tablerow);
			}}
			//make a srting for each iteam in the loop
			//append into #table-tasks in each step of the loop
		},
		"error" : function(data){
			console.log(data);
		}
	})
};

let detailController = function(taskid){
	console.log("Hi Sofia - you are in the detail controller now!");
	console.log(taskid);
	let the_serialized_data = "journalid="+taskid;
	console.log(the_serialized_data);
	$.ajax({
		url: endpoint02+"/journal",
		data: the_serialized_data,
		method: "GET",
		success: function (result){
			console.log(result);
			$(".content-wrapper").hide();
			$("#div-detail").show();
		//put the detail into the div-detail portion of the html 

			$("#detail-taskname").html(result[0]["journaltitle"]);
			$("#detail-description").html(result[0]["journalwriting"]);
			$("#detail-taskid").val(result[0]["journalid"]);
			},
		error: function(data){
			console.log(data);
		}

	})


}


let navigationControl = function(the_link){

	/* manage the content that is displayed */
	let idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */

let loginController = function(){
	//clear any previous messages
	$('#login_message').html("");
	$('#login_message').removeClass();

	//first, let's do some client-side 
	//error trapping.
	let username = $("#username").val();
	let password = $("#password").val();
	if (username == "" || password == ""){
		$('#login_message').html('The user name and password are both required.');
		$('#login_message').addClass("alert alert-danger text-center");
		return; //quit the function now!  Get outta town!  Stop. 
	}
	
	//whew!  We didn't quit the function because of an obvious error
	//what luck!  Let's go make an ajax call now

	//go get the data off the login form
	let the_serialized_data = $('#form-login').serialize();
	//the data I am sending
	console.log(the_serialized_data);;
	$.ajax({
		"url" : endpoint01,
		"method" : "GET",
		"data" : the_serialized_data,
		"success" : function(result){
			if (typeof result === 'string'){
				// login failed.  Remove usertoken 
				localStorage.removeItem("usertoken");
				$('#login_message').html(result);
				$('#login_message').addClass("alert alert-danger text-center");
			} else {
				//login succeeded.  Set usertoken.
				localStorage.usertoken = result['user_id']; 
				//console log the result ... a bad idea in prodcution
				//but useful for teaching, learning and testing
				console.log(result);
				//manage the appearence of things...
				$('#login_message').html('');
				$('#login_message').removeClass();
				$('.secured').removeClass('locked');
				$('.secured').addClass('unlocked');
				$('#div-login').hide(); //hide the login page
				$('#div-options').show();   //show the default page
				journalEntryController(); //refresh the task list
			}
		},
		"error" : function(data){
			console.log("Error!");
			console.log(data);
			},
	});
	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};

//document ready section
$(document).ready(function (){

    /* ----------------- start up navigation -----------------*/	
    /* controls what gets revealed when the page is ready     */

    /* this reveals the default page */
	if (localStorage.usertoken){
		$("#div-options").show()
		journalEntryController();
		$(".secured").removeClass("locked");		
		$(".secured").addClass("unlocked");
	}
	else {
		$("#div-login").show();
		$(".secured").removeClass("unlocked");
		$(".secured").addClass("locked");
	}

    /* ------------------  basic navigation -----------------*/	
    /* this controls navigation - show / hide pages as needed */

	/* what to do when any item of class nav-link is clicked */
	$(".nav-link").click(function(){
		navigationControl(this);
	});
		
	/* what happens if the login button is clicked? */
	$('#btnLogin').click(function(){
		loginController();
		
	});

/*the button actions for div-options     */

	$("#btnAddMood").click(function(){
		$("#div-options").hide();
		$("#div-mood").show();
		$("#response").removeClass();
		$("#response").html("");
		emojiController();
		
	});

	$('#btnWrite').click(function(){
		$("#div-options").hide();
		$("#div-journal").show();
		$('#journalerror').removeClass();
		$('#journalerror').html("");
	});

	$("#btnBored").click(function(){
		$(".content-wrapper").hide();
		$("#div-bored").show();
	});

	$("#btnAnalyze").click(function(){
		$("#div-options").hide();
		$("#div-analyze").show();
		Histor();
	});

	$("#btnPast").click(function(){
		$("#div-options").hide();
		$("#div-past").show();
	});


/*div-mood*/

	$("#happybtn").click(function(){
		emotionController('#happybtn','happy');
	});

	$("#neutralbtn").click(function(){
		emotionController('#neutralbtn','neutral');
	});

	$("#annoybtn").click(function(){
		emotionController('#annoybtn','annoyed');
	});

	$("#angrybtn").click(function(){
		emotionController('#angrybtn','angry');
	});

	$('#btnEmotion').click(function(){
        let choice = $("#emotion").val();

        if (choice == undefined || choice == "" ){
            $("#response").removeClass();
            $("#response").addClass("alert alert-danger");
            $("#response").html("Please select an emoji");
            return;
          }else{
            addSelectedMood();
          }
    });


/*div-journal buttons*/

$("#btnPublish").click(function(){
	let titlelabel = $('#journalTitle').val();
	let writearea = $('#journalWriting').val();
	
	if(titlelabel==""||writearea==""){
		$("#journalerror").removeClass();
		$("#journalerror").addClass("alert alert-danger");
		$("#journalerror").html("Please add something to the Title and Paragraph box");
		return;
	}
	else{
		$("#div-journal").hide();
		$("#div-past").show();
		addJournalController();
	}

});

$("#btnBTMain").click(function(){
	$("#div-journal").hide();
	$("#div-options").show();
});


/* div-analyze*/
$("#btnalyze").click(function(){
	$(".content-wrapper").hide();
	$("#div-options").show();
});

/* div-bored buttons*/

$('#btnRandom').click(function(){
	getBoredApi();
});

$("#backbtn").click(function(){
	$(".content-wrapper").hide();
	$("#div-options").show();
});


/* div-past buttons */

$("#btnReturn").click(function(){
	$("#div-past").hide();
	$("#div-options").show();
});


$('#btnPrevEntries').click(function(){
	$('.content-wrapper').hide();
	$('#div-past').show();
});


/* what happens if the main link is clicked? */
$('#link-main').click(function(){
	$(".content-wrapper").hide();
	$("#div-options").show();
});





	

	
	

	/* what happens if the logout link is clicked? */
	$('#link-logout').click(function(){
		// First ... remove usertoken from localstorage
		localStorage.removeItem("usertoken");
		// Now force the page to refresh
		window.location = "./index.html";
	});

}); /* end the document ready event*/
