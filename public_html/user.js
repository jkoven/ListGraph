/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global d3, lineHeight, deletedSubjects, subjectUsers, deletedUsers, svgdetail, colorList */

function onmouse(user, what) {
//    var usernode = d3.select("#node_" + user.replace(/[\.@]/g, "") + user.length.toString()).node();
    //clear connections
    var thisGroup = d3.select(this.parentNode);
    d3.selectAll("rect.user").attr("select_state", function (d) {
        var thisrect = d3.select(this);
        d3.selectAll("rect.time").attr({"preview-count": 0});
        switch (thisrect.attr("select_state")) {
            case "connected":
            case "selected":
            case "preview":
                return (thisrect.attr("select_state"));
                break;
            case "preview_connected":
            case "none":
            case "not_selected":
                return("none");
                break;
            default :
                break;
        }
    });
//    var thisnode = d3.select(usernode);
    var thisuser = d3.select("#userrect_" + user.replace(/[\.@]/g, "") + user.length.toString());
    switch (what) {
        case "remove":
        case "click":
            if (searchAll) {
                searchAll = false;
                selectedCount = 0;
                d3.selectAll("rect.user").attr("select_state", function () {
                    return (d3.select(this).attr("select_state") === "remove") ? "remove" : "none";
                }).attr("color", "transparent");
            }
            afterSearch = false;
            var gotopreview = false;
            d3.selectAll("line.link").attr("selected", "no");
            linkSelectedCount = 0;
            switch (thisuser.attr("select_state")) {
                case "none":
                    if (colorList.length < 1 && thisuser.attr("color") === "none") {
                        break;
                    }
                    if (thisuser.attr("color") === "none") {
                        thisuser.attr("color", colorList.pop());
                    }
                case "connected":
                case "preview_connected":
                case "preview":
                    thisuser.attr({
                        "select_state": "selected"
                    });
                    thisuser.datum().links.forEach(function (dd) {
                        dd.dates.forEach(function (ddd) {
                            var timerect = d3.select("#time_" + ddd.weekdate.toString());
                            timerect.attr({
                                "selected-count": function () {
                                    return parseInt(timerect.attr("selected-count"))
                                            + parseInt(ddd.count);
                                }
                            });
                        });
                    });
                    selectedCount++;
                    break;
                case "remove":
                case "selected":
                    gotopreview = true;
                    thisuser.attr({
                        "select_state": thisuser.attr("select_state") === "remove" ?
                                "remove" : "preview"
                    });
                    thisuser.datum().links.forEach(function (dd) {
                        dd.dates.forEach(function (ddd) {
                            var timerect = d3.select("#time_" + ddd.weekdate.toString());
                            timerect.attr({
                                "selected-count": function () {
                                    return thisuser.attr("select_state") === "remove" ?
                                            thisuser.attr("selected_count") : parseInt(timerect.attr("selected-count"))
                                            - parseInt(ddd.count);
                                }
                            });
                        });
                    });
                    if (thisuser.attr("select_state") !== "remove") {
                        selectedCount--;
                    }
                    break;
            }
            thisuser.datum().links.forEach(function (dd) {
                var linkrect = d3.select("#userrect_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
                if (linkrect.node() !== null && (linkrect !== thisuser)) {
                    if (linkrect.attr("select_state") !== "selected" && linkrect.attr("select_state") !== "preview") {
                        linkrect.attr({
                            "select_state": function () {
                                return gotopreview ? "preview_connected" :
                                        thisuser.attr("select_state") === "remove" ? "remove" : "connected";
                            }
                        });
                    }
                }
            });
            listSubjects();
            if (!gotopreview) {
                break;
            }
        case "mouseenter":
            d3.select("#ecount").text(thisuser.attr("emailcount"));
            d3.select("#lcount").text(thisuser.attr("linkcount"));
            switch (thisuser.attr("select_state")) {
                case "none":
                    if (selectedCount > 0) {
                        break;
                    }
                case "connected":
                    if (colorList.length < 1) {
                        break;
                    }
                    thisuser.attr("color", colorList.pop());
                case "preview_connected":
                case "preview":
                    thisuser.attr({
                        "select_state": "preview"
                    });
                    thisuser.datum().links.forEach(function (dd) {
                        var linkrect = d3.select("#userrect_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
                        if (linkrect.node() !== null && (linkrect !== thisuser)) {
                            if (!(linkrect.attr("select_state") === "selected"
                                    || linkrect.attr("select_state") === "connected")) {
                                linkrect.attr({
                                    "select_state": "preview_connected"
                                });
                            }
                        }
                        dd.dates.forEach(function (ddd) {
                            var timerect = d3.select("#time_" + ddd.weekdate.toString());
                            timerect.attr({
                                "preview-count": function () {
                                    return parseInt(timerect.attr("preview-count"))
                                            + parseInt(ddd.count);
                                }
                            });
                        });
                    });
                    break;
                case "selected":
                case "not_selected":
                    break;
                default :
                    break;
            }
            break;
        case "mouseleave":
            d3.select("#ecount").text(" ");
            d3.select("#lcount").text(" ");
            switch (thisuser.attr("select_state")) {
                case "none":
                case "preview_connected":
                    thisuser.attr({
                        "select_state": "none"
                    });
                    break;
                case "preview":
                    thisuser.datum().links.forEach(function (dd) {
                        var linkrect = d3.select("#userrect_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
                        if (linkrect.node() !== null && (linkrect !== thisuser)) {
                            if (linkrect.attr("select_state") === "preview_connected") {
                                linkrect.attr({
                                    "select_state": "none"
                                });
                            }
                        }
                    });
                    thisuser.attr({
                        "select_state": "none"
                    });
                    if (thisuser.attr("color") !== "none") {
                        colorList.push(thisuser.attr("color"));
                        thisuser.attr("color", "none");
                        if (selectedCount > 0) {
                            d3.selectAll("rect.user[select_state=selected]").each(function (d) {
                                d.links.forEach(function (dd) {
                                    var linkrect = d3.select("#userrect_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
                                    if (linkrect.node() !== null) {
                                        if (linkrect.attr("select_state") !== "selected") {
                                            linkrect.attr({
                                                "select_state": "connected"
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    }
                    break;
                case "selected":
                case "connected":
                    break;
                default :
                    break;
            }
            resetListBySelected();
            break;
    }
    syncDisplays();
}
function timeLines(svg) {
    d3.selectAll("rect.time").each(function () {
        var previewHeight = 0;
        var selectHeight = 0;
        var timeRect = d3.select(this);

        if (parseInt(timeRect.attr("count")) !== 0) {
            previewHeight = (parseInt(timeRect.attr("preview-count")) / parseInt(timeRect.attr("count")))
                    * parseInt(timeRect.attr("height"));
            selectHeight = (parseInt(timeRect.attr("selected-count")) / parseInt(timeRect.attr("count")))
                    * parseInt(timeRect.attr("height"));
        }
        d3.select("#" + (timeRect.attr("id").replace("time_", "previewtime_"))).attr({
            "y": parseInt(timeRect.attr("y")) + (parseInt(timeRect.attr("height")) - previewHeight),
            "height": previewHeight
        });
        d3.select("#" + (timeRect.attr("id").replace("time_", "selecttime_"))).attr({
            "y": parseInt(timeRect.attr("y")) + (parseInt(timeRect.attr("height")) - selectHeight),
            "height": selectHeight
        });
    });
    toFront(svg.selectAll("circle.user"), true);
}


function hiliteLinks(svg) {
    return;
}

function listSubjects(search, searchString, searchRange) {
    svgdetail.selectAll("g.subject").remove();
    previewframe.node().contentWindow.document.body.innerHTML = "";
//    svgdetail.selectAll(".select").remove();
//    svgdetail.selectAll(".delete").remove();
//    svgdetail.selectAll(".cover").remove();
    var rJson = {};
    if (!search) {
        if (linkSelectedCount < 1) {
            rJson["command"] = "subjectsor";
            var userList = [];
            d3.selectAll("rect.user").each(function (d) {
                var thisrect = d3.select(this);
                if (thisrect.attr("select_state") === "selected") {
                    userList.push(d.name);
                }
            });
            rJson["userList"] = userList;
        } else {
            rJson["command"] = "selectedlinks";
            var userLinks = [];
            d3.selectAll("line.link").each(function () {
                var pair = {};
                if (d3.select(this).attr("selected") === "yes") {
                    pair["owner"] = (d3.select("#" + d3.select(this).attr("owner")).datum().name);
                    pair["link"] = (d3.select("#" + d3.select(this).attr("link")).datum().name);
                    userLinks.push(pair);
                }
            });
            rJson["linkList"] = Array.from(userLinks);
        }
    } else {
        rJson["command"] = "search";
        rJson["searchString"] = searchString;
        rJson["searchRange"] = searchRange;
        afterSearch = true;
        if (searchRange === "all") {
            searchAll = true;
        }
    }
//    var subjectlines;
    var startX = 5 + lineHeight;
    foo = 0;
    d3.json("http://localhost:4444/")
            .header("Content-Type", "application/json")
            .post(JSON.stringify(rJson),
                    function (err, subjectlines) {
                        if (err) {
                            return console.warn(err);
                        }
                        var maxWidth = 0;
                        svgdetail.attr({
                            "height": function ()
                            {
                                return subjectlines.subjects.length * lineHeight + "px";
                            }
                        });
                        svgcloud.select("g").remove();
                        var wordScale = d3.scale.log()
                                .range([12, 48])
                                .domain([parseInt(subjectlines.minFreq), parseInt(subjectlines.maxFreq)]);
                        var layout = d3.layout.cloud()
                                .size([parseInt(svgcloud.attr("width")), parseInt(svgcloud.attr("height"))])
                                .words(subjectlines.results.map(function (d) {
                                    return {text: d.term, size: wordScale(parseInt(d.freq)), group: d.group};
                                }))
                                .padding(5)
                                .rotate(0)
                                .font("Impact")
                                .fontSize(function (d) {
                                    return d.size;
                                })
                                .timeInterval(3000)
                                .on("end", draw);

                        layout.start();
                        var subjects = svgdetail.selectAll("subjects").data(subjectlines.subjects);
//        console.log(subjectlines.length)
                        subjects.enter().append("g").classed("subject", true);
                        subjects.exit().remove();
                        subjects.attr({
                            "id": function (d, i) {
                                return "subjectgroup_" + i.toString();
                            },
                            "remove": function (d) {
                                return deletedSubjects.has(d.subject) ? "yes" : "no"
                            }
                        });
                        subjects.each(function (d, i) {
                            d3.select(this).append("text").classed("subject", true).text(function () {
                                return "(" + d.count.toString() + ")" + d.subject;
                            }).attr({
                                "x": startX,
                                "y": function () {
                                    return i * lineHeight + (lineHeight / 2);
                                },
                                "height": lineHeight,
                                "alignment-baseline": "middle",
                                "highlight": "no",
                                "id": function () {
                                    return "subjectline_" + i.toString();
                                },
                            }).each(function () {
                                maxWidth = (this.getComputedTextLength() > maxWidth) ? this.getComputedTextLength() + startX
                                        : maxWidth;
                            });
                        }).on({
                            "click": function (d) {
                                var emailList = [];
                                var i = 0;
                                while (selectedSubjects.length > 0) {
                                    var temp = selectedSubjects.pop();
                                    temp.select("text").attr({
                                        "highlight": "no"
                                    });
                                    temp.select("rect.subjectSelected").remove();
                                }
                                d3.select(this).select("text").attr({
                                    "highlight": "yes"
                                });
                                var group = d3.select(this);
                                group.insert("rect", ":first-child")
                                        .classed("subjectSelected", true)
                                        .attr({
                                            "x": 0,
                                            "y": function () {
                                                return (parseInt(group.select("text.subject")
                                                        .attr("y")) - 0.5 * lineHeight);
                                            },
                                            "width": parseInt(svgdivdetail.style("width")),
                                            "height": lineHeight
                                        });
                                selectedSubjects.push(d3.select(this));
                                d.docidlist.forEach(function (e) {
                                    emailList[i++] = e.toString();
                                });
                                displayemails(emailList, d.subject);
                            }
                        });
//                        svgdetail.attr({
//                            "width": (Math.ceil(maxWidth) + 5) + "px"
//                        });
                        d3.selectAll("g.subject").each(function (d, i) {
                            deleteBox(d3.select(this), d3.select(this).attr("id"),
                                    10, i * lineHeight + 5, "subject");
//            selectBox(svgdetail, d3.select(this).attr("id"),
//                    lineHeight + 10, i * lineHeight + 5, "subject");
                        });
                        sortSubjects();
                        subjectUsers.clear();
                        var links = subjectlines.links;
                        links.forEach(function (d) {
                            subjectUsers.add("userrect_" + d.name.replace(/[.@#]/g, "") + d.name.length.toString());
                        });
                        resetListBySelected((searchAll) ? "all" : searchRange);
                        if (d3.select("#listtype").node().value === "cloud") {
                            toFront(d3.select("#clouddiv"), true);
                        } else {
                            toFront(d3.select("#detaildiv"), true);
                        }
                    });
}

//function listSubjectTerms() {
//    d3.selectAll("text.subject").remove();
//    var cmdarg = "subjectsandterms|Subject"
//    d3.selectAll("rect.user").each(function (d) {
//        var thisrect = d3.select(this);
//        if (thisrect.attr("select_state") === "selected") {
//            cmdarg += "|" + d.name;
//        }
//    });
////    var subjectlines;
//    var startX = 5;
//    d3.csv("http://localhost:4444/?" + cmdarg, function (err, subjectlines) {
//        if (err) {
//            return console.warn(err);
//        }
//        var totalWidth = startX;
//        var maxLineHeight = 0;
//        var wordSpace = 5;
//        var minCount = Number.MAX_VALUE;
//        var maxCount = 0.0;
//        var minHeight = 8.0;
//        var maxHeight = 60.0;
//        var curY = 5 + maxHeight / 2;
//        var lineGap = 2;
//        var scaleFactor = 1.0;
//        svgdetail.attr({
//            "height": subjectlines.subjects.length * lineHeight + "px"
//        });
//        var subjects = svgdetail.selectAll("text.lines").data(subjectlines.subjects);
////        console.log(subjectlines.length)
//        subjects.enter().append("text").classed("subject", true);
//        subjects.exit().remove();
//        subjectlines.forEach(function (e, i, a) {
//            if (parseInt(e.count) < minCount) {
//                minCount = parseInt(e.count);
//            }
//            if (parseInt(e.count) > maxCount) {
//                maxCount = parseInt(e.count);
//            }
//        });
//        scaleFactor = (maxHeight - minHeight) / (maxCount - minCount);
//        subjects.text(function (d) {
//            return d.term;
//        })
//                .attr({
//                    "x": startX,
//                    "y": lineHeight,
//                    "font-size": function (d) {
//                        return (parseInt(d.count) * scaleFactor + minHeight - 1) + "px";
//                    },
//                    "height": lineHeight
//                });
//        svgdetail.selectAll("text.subject").each(function () {
//            var thisLength = this.getComputedTextLength();
//            var thisHeight = parseInt(d3.select(this).attr("font-size"));
//            if (thisHeight > maxLineHeight) {
//                maxLineHeight = thisHeight;
//            }
//            d3.select(this).attr({
//                "width": thisLength,
//                "x": function () {
//                    totalWidth += thisLength + wordSpace;
//                    if (totalWidth > (svgdetail.attr("width") - 2 * startX)) {
//                        curY += maxLineHeight + lineGap;
//                        maxLineHeight = 0;
//                        totalWidth = startX + thisLength;
//                        return startX;
//                    } else {
//                        return totalWidth - thisLength;
//                    }
//                },
//                "y": function () {
//                    return curY;
//                }
//            });
//        });
//        svgdetail.attr({
//            "height": function () {
//                return curY + lineHeight;
//            }
//        });
//    });
//}

function deleteSelectedUsers() {
    var excludeList = [];
    d3.selectAll("rect.user[select_state=selected]").each(function () {
        var thisGroup = d3.select(this.parentNode);
        excludeList.push(thisGroup.datum().name);
    });
    if (excludeList !== "topuusers|false") {
        setupDisplays(false, excludeList);
    }
}

function deleteCheckedUsers() {
    var excludeList = [];
    d3.selectAll("rect.delete[checked=yes][type=user]").each(function (d) {
        var thisRect = d3.select("#" + d3.select(this).attr("owner"));
        excludeList.push(thisRect.datum().name);
    });
    if (excludeList !== "topuusers|false") {
        setupDisplays(false, excludeList);
    }
}
function removeUser(user) {
    if (deletedUsers.has(user.datum().name)) {
        deletedUsers.delete(user.datum().name);
    } else {
        deletedUsers.add(user.datum().name);
    }
    user.attr({
        "remove": (user.attr("remove") === "no") ? "yes" : "no"
    });
    if (user.attr("remove") === "yes") {
        if (user.select("rect.user").attr("select_state") !== "selected") {
            user.select("rect.user").attr({
                "select_state": "remove"
            });
        }
        onmouse(user.datum().name, "remove");
        user.select("rect.user").attr({
            "select_state": "remove"
        });
    } else {
        user.select("rect.user").attr({
            "select_state": "none"
        });
    }
    sortUsers();
    listSubjects();
}

function sortUsers() {
    var winHeight = parseInt(d3.select("#listdiv").style("height"));
    var maxLines = Math.floor(winHeight / lineHeight);
    toFront(d3.selectAll("g.user[remove=yes]"), true);
    d3.selectAll("g.user[remove=yes]").sort(function (a, b) {
        return d3.descending(a.count, b.count);
    });
    d3.selectAll("g.user[remove=no]").sort(function (a, b) {
        return d3.descending(a.count, b.count);
    });
    d3.selectAll("g.user").each(function (d, i) {
        d3.select(this).select("text").attr({
            "y": function () {
                return (i % maxLines) * lineHeight + (lineHeight / 2);
            }
        });
        d3.select(this).select("line.selectlink").attr({
            "y1": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2;
            },
            "y2": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2;
            }
        });
        d3.select(this).select("line.previewlink").attr({
            "y1": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2 - 4;
            },
            "y2": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2 - 4;
            }
        });
        d3.select(this).select("line.previewaddlink").attr({
            "y1": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2 - 8;
            },
            "y2": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2 - 8;
            }
        });
        d3.select(this).select("circle.emailbar").attr({
            "cy": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2;
            }
        });
        d3.select(this).select("rect.user").attr({
            "y": function () {
                return (i % maxLines) * lineHeight;
            }
        });
        d3.select(this).select("rect.delete").attr({
            "y": function () {
                return (i % maxLines) * lineHeight + 5;
            }
        });
        d3.select(this).select("line.delete").attr({
            "y1": function () {
                return (i % maxLines) * lineHeight + (lineHeight / 2);
            },
            "y2": function () {
                return (i % maxLines) * lineHeight + (lineHeight / 2);
            }
        });
    });
//    displayUsersCircle(d3.selectAll("g.user[remove=no]"));
}
function removeSubject(subject) {
    if (deletedSubjects.has(subject.datum().subject)) {
        deletedSubjects.delete(subject.datum().subject);
    } else {
        deletedSubjects.add(subject.datum().subject);
    }
    subject.attr({
        "remove": (subject.attr("remove") === "no") ? "yes" : "no"
    });
    sortSubjects();
}

function sortSubjects() {
    var subjects = d3.selectAll("g.subject");
    subjects.each(function () {
//        console.log(d3.select(this).datum().subject);
        if (deletedSubjects.has(d3.select(this).datum().subject)) {
            toFront(d3.select(this), true);
        }
    });
    subjects = d3.selectAll("g.subject").each(function (d, i) {
        d3.select(this).select("text").attr({
            "y": function () {
                return i * lineHeight + (lineHeight / 2);
            }
        });
        d3.select(this).select("line").attr({
            "y1": function () {
                return i * lineHeight + (lineHeight / 2);
            },
            "y2": function () {
                return i * lineHeight + (lineHeight / 2);
            }
        });
        d3.select(this).selectAll("rect").attr({
            "y": function () {
                return i * lineHeight + 5;
            }
        });
    });
    toFront(subjects, true);
}

function resetListBySelected(range) {
    if (range === "all") {
        selectedCount = 0;
        linkSelectedCount = 0;
        d3.selectAll("line.link").attr("selected", "no");
        d3.selectAll("rect.user").attr("select_state", function () {
            if (subjectUsers.has(d3.select(this).attr("id"))) {
                selectedCount++;
                return "selected";
            } else {
                return "none";
            }
        });
    } else if (subjectUsers.size > 0) {
        if (linkSelectedCount < 1) {
            d3.selectAll("rect.user").each(function () {
                var thisRect = d3.select(this);
                if (!subjectUsers.has(thisRect.attr("id"))) {
                    switch (thisRect.attr("select_state")) {
                        case "none" :
                        case "not_selected" :
                        case "selected" :
                            break;
                        case "connected" :
                        case "preview_connected" :
                        case "preview" :
                            thisRect.attr("select_state", "none");
                            break;
                        default :
                    }
                }
            });
        }
    } else if (range === "selected") {
        d3.selectAll("rect.user").attr("select_state", function () {
            return (d3.select(this).attr("select_state") === "remove") ? "remove" :
                    (d3.select(this).attr("select_state") === "selected") ? "selected" : "none";
        });
    }

    syncDisplays();
}

function draw(words) {
    svgcloud
            .append("g")
            .attr("transform", "translate(" + parseInt(svgcloud.attr("width")) / 2 + "," + parseInt(svgcloud.attr("height")) / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .attr("group", function (d) {
                return d.group;
            })
            .text(function (d) {
                return d.text;
            });
}
