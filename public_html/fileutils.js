/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function displayemails(emailList, subject) {
    var rJson = {};
    rJson["command"] = "emaillist";
    rJson["urlpath"] = window.location.pathname.match(/(.*)[\/\\]/)[1] || '';
    var list = [];
    emailList.forEach(function (e) {
        list.push(e);
    });
    rJson["emailList"] = list;
    rJson["showheaders"] = showHeaders;
    d3.text("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, emailcontent) {
                        if (err) {
                            return console.warn(err);
                        }
                        previewframe.node().contentWindow.document.body.innerHTML = "";
                        previewframe.node().contentWindow.document.open();
                        previewframe.node().contentWindow.document.write(emailcontent);
                        previewframe.node().contentWindow.document.close();
                        previewframe.node().contentWindow.scrollTo(0, 0)
                        previewframe.node().contentWindow.onclick = function (event) {
                            event.preventDefault();
                            displayFrameInTab(subject);
                        };
//                        var specs = "";
//                        var myWindow = window.open("Subject", subject);
////        String.prototype.asHtml = function () {
////            return $('<mock />').html(this).text();
////        }
//                        myWindow.document.title = subject;
//                        myWindow.document.write(emailcontent);
//
////                        myWindow.document.write("<div word-wrap = break-word><pre>" + emailcontent + "</pre></div>");
                    });
}

function displayFrameInTab(subject) {
    var emailcontent = previewframe.node().contentWindow.document.body.innerHTML;
    var myWindow = window.open("Subject", subject);
    myWindow.document.title = subject;
    myWindow.document.write(emailcontent);
    myWindow.document.close();
}

function saveEmailsStart() {
    var box = d3.select("#savefiledialog").style({
        "display": "block"
    });
    toFront(box, true);
    d3.select("#saveas").node().focus();
}

//function saveEmails() {
//    d3.select("#savefiledialog").style({
//        "display": "none"
//    });
//    var rJson = {};
//    var sline = d3.select("#saveas").node();
//    var sName = sline.value;
//    sline.value = "";
//    var sarea = d3.select("#savenotes").node();
//    var sComments = sarea.value;
//    sarea.value = "";
//    var argString = "savefile|" + escape(sName) + "|" + escape(sComments);
//    d3.selectAll("g.subject[remove=no]").each(function(d){
//        d.docidlist.forEach(function(dd){
//            argString += "|" + dd.toString();
//        });
//    });
//    d3.text("http://localhost:4444/?" + argString, function (err, ackstring) {
//        if (err) {
//            return console.warn(err);
//        }
//        console.log(ackstring);
//    });
//}
function saveEmails() {
    d3.select("#savefiledialog").style({
        "display": "none"
    });
    var rJson = {};
    rJson["command"] = "savefile";
    var sline = d3.select("#saveas").node();
    rJson["filename"] = sline.value;
    sline.value = "";
    var sarea = d3.select("#savenotes").node();
    rJson["comments"] = sarea.value;
    sarea.value = "";
    var users = [];
    d3.selectAll("rect.user[select_state=selected]").each(function () {
        var foo = d3.select(this.parentNode)
        users.push(foo.datum().name);
    });
    var deletedUsers = [];
    d3.selectAll("g.user[remove=yes]").each(function (d) {
        deletedUsers.push(d.name);
    });
    var fileids = [];
    d3.selectAll("g.subject[remove=no]").each(function (d) {
        d.docidlist.forEach(function (dd) {
            fileids.push(dd);
        });
    });
    var deletedList = [];
    deletedSubjects.forEach(function (d) {
        deletedList.push(d);
    });
    rJson["users"] = users;
    rJson["deletedUsers"] = deletedUsers;
    rJson["docIds"] = fileids;
    rJson["deletedSubjects"] = deletedList;
    d3.text("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, rawData) {
                        if (err) {
                            return console.warn(err);
                        }
                        alert(rawData);
                    }
            );
}

function saveEmailsCancel() {
    d3.select("#savefiledialog").style({
        "display": "none"
    });
    var sline = d3.select("#saveas").node();
    sline.value = "";
    var sarea = d3.select("#savenotes").node();
    sarea.value = "";
}
function loadEmailsCancel() {
    d3.select("#loadfiledialog").style({
        "display": "none"
    });
    d3.select("#loadfilelist").selectAll("li").remove();
}

function saveSelected() {
    var rJson = {};
    rJson["command"] = "saveSelected";
    rJson["savemerge"] = "yes";
    rJson["headers"] = "no";
    var sline = d3.select("#saveas").node();
    var fileids = [];
    d3.selectAll("g.subject[remove=no]").each(function (d) {
        d.docidlist.forEach(function (dd) {
            fileids.push(dd);
        });
    });
    rJson["docIds"] = fileids;
    d3.text("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, rawData) {
                        if (err) {
                            return console.warn(err);
                        }
                        alert(rawData);
                    }
            );
}

function buildFileListSelectMenu() {
    var box = d3.select("#loadfiledialog").style({
        "display": "block"
    });
    toFront(box, true);
    d3.select("#loadlist").node().focus();
    var rJson = {};
    rJson["command"] = "filelist";
    d3.json("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, data) {
                        if (err) {
                            return console.warn(err);
                        }
                        var loadList = d3.select("#loadfilelist");
                        data.filelist.forEach(function (d) {
                            loadList.append("li").text(d).on({
                                "click": function () {
                                    loadSaved(d)
                                },
                                "mouseenter": function () {
                                    d3.select(this).style({
                                        "background-color": "#51cbee"
                                    });
                                },
                                "mouseleave": function () {
                                    d3.select(this).style({
                                        "background-color": "white"
                                    });
                                }
                            });
                        });
                    }
            );
}

function loadSaved(filename) {
    var rJson = {};
    rJson["command"] = "getfile";
    rJson["filename"] = filename;
    d3.json("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, jData) {
                        if (err) {
                            return console.warn(err);
                        }
                        setupDisplays('true', new Array(), "no",jData);
                    }
            );
    loadEmailsCancel();
}

function emailMergeDump(useHeaders) {
    var rJson = {};
    rJson["command"] = "mergedump";
    rJson["useheaders"] = useHeaders;
    d3.text("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, data) {
                        if (err) {
                            return console.warn(err);
                        }
                        alert(data);
                    }
            );
}

