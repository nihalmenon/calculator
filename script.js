var operations = ['simplify', 'factor', 'derive', 'integrate', 'zeroes', 'tangent', 'area', 'cos', 'sin', 'tan', 'arccos', 'arcsin', 'arctan', 'abs', 'log'];
var storedInputs = [];
var storedOutputs = [];

$("#reset").click(function(){
	$("#textbox").text("");
});


$("#textbox").keypress(function(){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		update();
	}
});


function update(){
	for (var i = 0; i < (operations.length - 1); i++) {
		if ($("#textbox").text().toLowerCase().includes(operations[i])) {
			if (storedInputs.length >= 7) {
				storedInputs.shift();
				storedInputs.push($("#textbox").text());				
			}else{
				storedInputs.push($("#textbox").text());
			}
			var userOperation = operations[i];
			var textcontent = $("#textbox").text();
			var expression = textcontent.slice(textcontent.indexOf(userOperation) + userOperation.length + 1, textcontent.length);
			var request = new XMLHttpRequest();
			var link = 'https://newton.now.sh/' + userOperation + '/' + expression + '';
			$("#input1").text(storedInputs[0]);
			$("#input2").text(storedInputs[1]);
			$("#input3").text(storedInputs[2]);
			$("#input4").text(storedInputs[3]);
			$("#input5").text(storedInputs[4]);
			$("#input6").text(storedInputs[5]);
			$("#input7").text(storedInputs[6]);
			$.ajax({
				url: link,
				type: "GET",
				success: function(result){
					var answer = result['result'];
					if (storedOutputs.length >= 7) {
						storedOutputs.shift();
						storedOutputs.push(answer);

					}else{
						storedOutputs.push(answer);
					}
					$("#output1").text(storedOutputs[0]);
					$("#output2").text(storedOutputs[1]);
					$("#output3").text(storedOutputs[2]);
					$("#output4").text(storedOutputs[3]);
					$("#output5").text(storedOutputs[4]);
					$("#output6").text(storedOutputs[5]);
					$("#output7").text(storedOutputs[6]);
					$("#textbox").text("");
				},
				error:function(error){
					var answer = "Error";
					console.log(`Error ${error}`);
					$("#textbox").text("");
				}
			});
		}else if($("#textbox").text().search(/[a-zA-Z]/i) == -1){
			if (i == 0){
				if($("#textbox").text().startsWith("+") || $("#textbox").text().startsWith("-") || $("#textbox").text().startsWith("*") || $("#textbox").text().startsWith("/")){
					$("#textbox").text(storedOutputs[storedOutputs.length - 1] + $("#textbox").text())
				}
				if (storedInputs.length >= 7) {
					storedInputs.shift();
					storedInputs.push($("#textbox").text());				
				}else{
					storedInputs.push($("#textbox").text());
				}
				var textcontent = $("#textbox").text();
				var expression = textcontent;
				var request = new XMLHttpRequest();
				var link2 = 'https://newton.now.sh/simplify/' + expression + '';
				$("#input1").text(storedInputs[0]);
				$("#input2").text(storedInputs[1]);
				$("#input3").text(storedInputs[2]);
				$("#input4").text(storedInputs[3]);
				$("#input5").text(storedInputs[4]);
				$("#input6").text(storedInputs[5]);
				$("#input7").text(storedInputs[6]);
				$.ajax({
					url: link2,
					type: "GET",
					success: function(result){
						var answer = result['result'];
						if (storedOutputs.length >= 7) {
							storedOutputs.shift();
							storedOutputs.push(answer);

						}else{
							storedOutputs.push(answer);
						}
						$("#output1").text(storedOutputs[0]);
						$("#output2").text(storedOutputs[1]);
						$("#output3").text(storedOutputs[2]);
						$("#output4").text(storedOutputs[3]);
						$("#output5").text(storedOutputs[4]);
						$("#output6").text(storedOutputs[5]);
						$("#output7").text(storedOutputs[6]);
						$("#textbox").text("");
					},
					error:function(error){
						var answer = "Error";
						console.log(`Error ${error}`);
						$("#textbox").text("");
					}
				});
			}
		}
	}
}


// function placeCaretAtEnd(el) {
//     el.focus();
//     if (typeof window.getSelection != "undefined"
//             && typeof document.createRange != "undefined") {
//         var range = document.createRange();
//         range.selectNodeContents(el);
//         range.collapse(false);
//         var sel = window.getSelection();
//         sel.removeAllRanges();
//         sel.addRange(range);
//     } else if (typeof document.body.createTextRange != "undefined") {
//         var textRange = document.body.createTextRange();
//         textRange.moveToElementText(el);
//         textRange.collapse(false);
//         textRange.select();
//     }
// }

// var firstTime = true;
// $("#textbox").keydown(function(){
// 	for (var i = 0; i < (operations.length - 1); i++) {
// 		if ($("#textbox").text().toLowerCase().includes(operations[i])) {
// 			if (firstTime == true || storedInputs.length > 0) {
// 				var oldStr = $("#textbox").html() + " ";
// 				var keyWord = $("#textbox").text().slice($("#textbox").text().indexOf(operations[i]), $("#textbox").text().indexOf(operations[i]) + operations[i].length);
// 				if (!oldStr.includes("span")){
// 					var newStr = oldStr.replace(keyWord + " ", "<span class='operationWord'>" + keyWord + "</span>");
// 				}
// 				console.log("old: " + oldStr);
// 				console.log("new: " + newStr);
// 				$("#textbox").html(newStr);
// 				firstTime = false;
// 				placeCaretAtEnd(document.querySelector("#textbox"));
// 			}
// 		}
// 	}
// });

 

