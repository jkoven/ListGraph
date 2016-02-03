/* global d3 */

///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
///* global lineHeight, d3, milliWeek */
//
//function displayUsersCircle(userList) {
//    svgarc.selectAll("g").remove();
//    svgarc.selectAll("line").remove();
//    var size = userList.size();
//    var radDegree = 0.0176;
//    var dispCirc = svgarc.append("circle").classed("guide", true).attr({
//        "cx": parseInt(svgarc.attr("width")) / 2,
//        "cy": parseInt(svgarc.attr("height")) / 2,
//        "r": radius
//    });
//
//    userList.each(function (d, i) {
//        var thisUser = d3.select(this);
//        var thisGroup = svgarc.append("g").classed("usercircle", true).attr({
//            "owner": thisUser.attr("id")
//        });
//        thisGroup.append("circle").classed("emailbar", true).attr({
//            "cx": function () {
//                var i4 = i % 4;
//                var chunk = 90;
//                var degreeperpoint = 360.0 / (size + 1);
//                var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
//                return ((parseFloat(dispCirc.attr("cx")))
//                        + (radius
//                                * Math.cos(radDegree * curdegree)));
////            return ((parseFloat(dispCirc.attr("cx")))
////                    + (radius
////                            * Math.cos(radDegree * (360.0 / (data.length + 1)) * i)));
//            },
//            "cy": function () {
//                var i4 = i % 4;
//                var chunk = 90;
//                var degreeperpoint = 360.0 / (size + 1);
//                var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
//                return ((parseFloat(dispCirc.attr("cy")))
//                        + (radius
//                                * Math.sin(radDegree * curdegree)));
//            },
//            "id": function () {
//                return "node_" + d.name.replace(/[\.@]/g, "") + d.name.length.toString();
//            },
//            "r": function () {
//                return radScaleFactor(d.count);
//            },
//            "index": function () {
//                return i;
//            },
//            "thisdegree": function () {
//                var i4 = i % 4;
//                var chunk = 90;
//                var degreeperpoint = 360.0 / (size + 1);
//                return chunk * i4 + degreeperpoint * Math.floor(i / 4);
//            },
//            "select_state": "none"
//        })
//                .on({
//                    "click": function () {
//                        onmouse(thisUser.datum().name, "click");
//                    },
//                    "mouseenter": function () {
//                        onmouse(thisUser.datum().name, "mouseenter");
//                    },
//                    "mouseleave": function () {
//                        onmouse(thisUser.datum().name, "mouseleave");
//                    }
//                });
//
//        var thisNode = thisGroup.select("circle.emailbar");
//        var node = thisGroup.append("text").classed("nodelabel", true);
//        var i4 = i % 4;
//        var chunk = 90;
//        var degreeperpoint = 360.0 / (size + 1);
//        var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
//        node.text(d.name).attr({
//            "alignment-baseline": "middle",
////            "x": function () {
////                return 0;
//////            return ((parseFloat(dispCirc.attr("cx")))
//////                    + (radius
//////                            * Math.cos(radDegree * (360.0 / (data.length + 1)) * i)));
////            },
////            "y": function () {
////                return 0;
////            },
////            "transform": function() {
////                var x = ((parseFloat(dispCirc.attr("cx")))
////                        + ((radius + 5)
////                                * Math.cos(radDegree * curdegree)));
////                var y = ((parseFloat(dispCirc.attr("cy")))
////                        + ((radius + 5)
////                                * Math.sin(radDegree * curdegree)));
////                var flip =(parseInt(thisNode.attr("thisdegree")) >= 270 || parseInt(thisNode.attr("thisdegree")) <= 90) ? "" : " scale(-1 -1)";
////                return "translate(" + [ x, y ] + ") rotate(" + curdegree +  ")" + flip;
////            },
//            "x": function () {
//                return (parseInt(thisNode.attr("thisdegree")) >= 270 ||
//                        parseInt(thisNode.attr("thisdegree")) < 90)
//                        ? parseFloat(thisNode.attr("cx")) + 20
//                        : parseFloat(thisNode.attr("cx")) - 20;
////                var i4 = i % 4;
////                var chunk = 90;
////                var degreeperpoint = 360.0 / (size + 1);
////                var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
////                return ((parseFloat(dispCirc.attr("cx")))
////                        + ((radius + 5)
////                                * Math.cos(radDegree * curdegree)));
//////            return ((parseFloat(dispCirc.attr("cx")))
//////                    + (radius
//////                            * Math.cos(radDegree * (360.0 / (data.length + 1)) * i)));
//            },
////            "y": function () {
////                var i4 = i % 4;
////                var chunk = 90;
////                var degreeperpoint = 360.0 / (size + 1);
////                var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
////                return ((parseFloat(dispCirc.attr("cy")))
////                        + ((radius + 5)
////                                * Math.sin(radDegree * curdegree)));
////            },
//            "y": function () {
//                var chunkY = (parseFloat(svgarc.attr("height")) - 20) / 180;
//                var ydegree = parseFloat(thisNode.attr("thisdegree"));
//                var qdegree = ydegree % 90;
//                if (ydegree >= 90) {
//                    if (ydegree >= 180) {
//                        if (ydegree >= 270) {
//                            return (qdegree * chunkY + 15);
//                        } else {
//                            return (parseFloat(dispCirc.attr("cy")) - (qdegree * chunkY));
//                        }
//                    } else {
//                        return ((parseFloat(svgarc.attr("height")) - 15) - qdegree * chunkY);
//                    }
//                } else {
//                    return (parseFloat(dispCirc.attr("cy")) + (parseFloat(qdegree) * chunkY));
//                }
//            },
//            "id": function () {
//                return "nodelabel_" + d.name.replace(/[\.@]/g, "") + d.name.length.toString();
//            },
//            "text-anchor": function () {
//                return (parseInt(thisNode.attr("thisdegree")) >= 270 || parseInt(thisNode.attr("thisdegree")) < 90) ? "start" : "end";
//            },
//            "select_state": "none"
//        }).on({
//            "click": function () {
//                onmouse(thisUser.datum().name, "click");
//            },
//            "mouseenter": function () {
//                onmouse(thisUser.datum().name, "mouseenter");
//            },
//            "mouseleave": function () {
//                onmouse(thisUser.datum().name, "mouseleave");
//            }
//        });
//        thisGroup.append("line").classed("pointer", true).attr({
//            "x1": function () {
//                var i4 = i % 4;
//                var chunk = 90;
//                var degreeperpoint = 360.0 / (size + 1);
//                var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
//                return ((parseFloat(dispCirc.attr("cx")))
//                        + (radius
//                                * Math.cos(radDegree * curdegree)));
////            return ((parseFloat(dispCirc.attr("cx")))
////                    + (radius
////                            * Math.cos(radDegree * (360.0 / (data.length + 1)) * i)));
//            },
//            "y1": function () {
//                var i4 = i % 4;
//                var chunk = 90;
//                var degreeperpoint = 360.0 / (size + 1);
//                var curdegree = chunk * i4 + degreeperpoint * Math.floor(i / 4);
//                return ((parseFloat(dispCirc.attr("cy")))
//                        + (radius
//                                * Math.sin(radDegree * curdegree)));
//            },
//            "x2": function () {
//                return (parseInt(thisNode.attr("thisdegree")) >= 270 ||
//                        parseInt(thisNode.attr("thisdegree")) < 90)
//                        ? parseFloat(thisNode.attr("cx")) + 20
//                        : parseFloat(thisNode.attr("cx")) - 20;
//            },
//            "y2": function () {
//                var chunkY = (parseFloat(svgarc.attr("height")) - 20) / 180;
//                var ydegree = parseFloat(thisNode.attr("thisdegree"));
//                var qdegree = ydegree % 90;
//                if (ydegree >= 90) {
//                    if (ydegree >= 180) {
//                        if (ydegree >= 270) {
//                            return (qdegree * chunkY + 15);
//                        } else {
//                            return (parseFloat(dispCirc.attr("cy")) - (qdegree * chunkY));
//                        }
//                    } else {
//                        return ((parseFloat(svgarc.attr("height")) - 15) - qdegree * chunkY);
//                    }
//                } else {
//                    return (parseFloat(dispCirc.attr("cy")) + (parseFloat(qdegree) * chunkY));
//                }
//            }
//        });
//    });
//    cdrawLinks();
//}

function displayUsers(svg, data) {
    var startX = 5 + lineHeight;
    var winHeight = parseInt(d3.select("#listdiv").style("height"));
    var curCol = 0;
    var colWidth = parseInt(svg.attr("width")) / 3;
    var ngroups = svg.selectAll("column1").data(data);
    var maxLines = Math.floor(winHeight / lineHeight);
    svg.attr({
        "height": maxLines * lineHeight + "px"
    });
    ngroups.enter().append("g").classed("user", true);
    ngroups.exit().remove();
    ngroups.attr({
        "id": function (d) {
            return "usergroup_" + d.name.replace(/[.@#]/g, "") + d.name.length.toString();
        },
        "remove": "no"
    });
    ngroups.each(function (d, i) {
        curCol = Math.floor(i / maxLines);
        var thisGroup = d3.select(this);
        var thisText = thisGroup.append("text").classed("user", true).text(function () {
            return d.name;
        }).attr({
            "x": startX + (curCol * colWidth),
            "y": function () {
                return (i % maxLines) * lineHeight + (lineHeight / 2);
            },
            "width": colWidth - 5 * lineHeight,
            "height": lineHeight,
            "id": function () {
                return "username_" + d.name.replace(/[.@#]/g, "") + d.name.length.toString();
            },
            "alignment-baseline": "middle"
        });
        var charLength = d.name.length;
        while (thisText.node().getBBox().width > colWidth - 6 * lineHeight) {
            thisText.node().textContent = d.name.substring(0, --charLength);
        }
        thisGroup.append("circle").classed("emailbar", true).attr({
            "cx": ((curCol + 1) * colWidth) - 4.5 * lineHeight,
            "cy": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2;
            },
            "r": function () {
                return radScaleFactor(d.count);
            }
        });
        for (var ii = 0; ii < 6; ii++) {
            thisGroup.append("line").classed("edge_" + ii, true).attr({
                "x1": ((curCol + 1) * colWidth) - 4 * lineHeight,
                "y1": function () {
                    return (i % maxLines) * lineHeight + 3 * ii + 3;
                },
                "x2": ((curCol + 1) * colWidth) - 4 * lineHeight,
//            "x2": (((curCol + 1) * colWidth) - 4 * lineHeight) + linkScaleFactor(d.links.length),
                "y2": function () {
                    return (i % maxLines) * lineHeight + 3 * ii + 3;
                }
            });
        }
//        thisGroup.append("line").classed("previewlink", true).attr({
//            "x1": ((curCol + 1) * colWidth) - 4 * lineHeight,
//            "y1": function () {
//                return (i % maxLines) * lineHeight + lineHeight / 2 - 4;
//            },
//            "x2": ((curCol + 1) * colWidth) - 4 * lineHeight,
////            "x2": (((curCol + 1) * colWidth) - 4 * lineHeight) + linkScaleFactor(d.links.length),
//            "y2": function () {
//                return (i % maxLines) * lineHeight + lineHeight / 2 - 4;
//            }
//        });
//        thisGroup.append("line").classed("selectlink", true).attr({
//            "x1": ((curCol + 1) * colWidth) - 4 * lineHeight,
//            "y1": function () {
//                return (i % maxLines) * lineHeight + lineHeight / 2;
//            },
//            "x2": ((curCol + 1) * colWidth) - 4 * lineHeight,
////            "x2": (((curCol + 1) * colWidth) - 4 * lineHeight) + linkScaleFactor(d.links.length),
//            "y2": function () {
//                return (i % maxLines) * lineHeight + lineHeight / 2;
//            }
//        });
        thisGroup.append("line").classed("previewaddlink", true).attr({
            "x1": ((curCol + 1) * colWidth) - 4 * lineHeight,
            "y1": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2 - 8;
            },
            "x2": ((curCol + 1) * colWidth) - 4 * lineHeight,
//            "x2": (((curCol + 1) * colWidth) - 4 * lineHeight) + linkScaleFactor(d.links.length),
            "y2": function () {
                return (i % maxLines) * lineHeight + lineHeight / 2 - 8;
            }
        });
//        thisGroup.append("line").classed("emailbar", true).attr({
//            "x1": ((curCol + 1) * colWidth) - 4 * lineHeight,
//            "y1": function () {
//                return (i % maxLines) * lineHeight + lineHeight / 2 + 4;
//            },
//            "x2": (((curCol + 1) * colWidth) - 4 * lineHeight) + emailScaleFactor(d.count),
//            "y2": function () {
//                return (i % maxLines) * lineHeight + lineHeight / 2 + 4;
//            }
//        });
        thisGroup.append("rect").classed("user", true)
                .attr({
                    "x": (curCol * colWidth),
                    "y": function () {
                        return (i % maxLines) * lineHeight;
                    },
                    "width": parseInt(colWidth),
                    "height": lineHeight,
                    "id": function () {
                        return "userrect_" + d.name.replace(/[.@#]/g, "") + d.name.length.toString();
                    },
                    "stroke-width": "1px",
                    "stroke": "transparent",
//        "fill": "transparent",
                    "fill-opacity": ".2",
                    "select_state": "none",
                    "color": "none",
                    "emailcount": function () {
                        return d.count;
                    },
                    "linkcount": function (d) {
                        return d.links.length;
                    },
                    "index": function () {
                        return i;
                    }
                }).on({
            "click": function () {
                onmouse(thisGroup.datum().name, "click");
            },
            "mouseenter": function () {
                onmouse(thisGroup.datum().name, "mouseenter");
            },
            "mouseleave": function () {
                onmouse(thisGroup.datum().name, "mouseleave");
            }
        });
        deleteBox(thisGroup, thisGroup.attr("id"), curCol * colWidth + 10, (i % maxLines) * lineHeight + 5, "user");
    });
    sortUsers();
}

function displayTime(svg, timedata) {
    var minCount = timedata.mincount;
    var maxCount = timedata.maxcount;
    var minDate = timedata.mindate;
    var maxDate = timedata.maxdate;

    var yScale = d3.scale.linear().range([(parseInt(svg.attr("height")) - 30), 10])
            .domain([0, maxCount]);
    var timeScale = d3.time.scale().range([10, parseInt(svg.attr("width")) - 40])
            .domain([new Date(minDate), new Date(maxDate)]);
//        console.log(timeScale.domain());
//        console.log(timeScale.range());
    var first = 1;
    var month = d3.time.format("%b");
    var year = d3.time.format('%Y');
    var xaxis = d3.svg.axis()
            .scale(timeScale)
            .orient('bottom')
            .tickFormat(function (t) {
                var out = month(t);
                out = out === 'Jan' || first ? year(t) : out;
                first = 0;
                return out;
            })
            .tickSize(10, 2);
//                .tickPadding(8);
    var yaxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .tickValues(yScale.ticks(6).map(yScale.tickFormat(6, "d")))
            .tickSize(5, 2);
//                .tickPadding(8);
    svg.append('g')
            .classed("xaxis", true)
            .attr("transform", "translate(30," + (parseInt(svg.attr("height")) - 30) + ")")
            .call(xaxis);

    svg.append('g')
            .classed("yaxis", true)
            .attr("transform", "translate(40,0)")
            .call(yaxis);
    yaxis.tickValues().forEach(function (d) {
        svg.append("line").classed("refline", true)
                .attr({
                    "x1": 40,
                    "y1": yScale(d),
                    "x2": parseInt(svg.style("width")),
                    "y2": yScale(d)
                });
    });

    timedata.buckets.forEach(function (d) {
        svg.append("rect").classed("time", true).attr({
            "x": timeScale(new Date(d.weekdate)) + 30,
            "y": yScale(d.count),
            "width": timeScale(new Date(d.weekdate + milliWeek)) - timeScale(new Date(d.weekdate)),
            "height": yScale(0) - yScale(d.count),
            "id": "time_" + d.weekdate.toString(),
            "stroke-width": "1px",
            "stroke": "lightgrey",
            "fill": "lightgrey",
            "fill-opacity": .5,
            "count": d.count,
            "selected-count": 0,
            "preview-count": 0
        });
        svg.append("rect").classed("previewtime", true).attr({
            "x": timeScale(new Date(d.weekdate)) + 30,
            "y": yScale(d.count),
            "width": timeScale(new Date(d.weekdate + milliWeek)) - timeScale(new Date(d.weekdate)),
            "height": 0,
            "id": "previewtime_" + d.weekdate.toString()
        });
        svg.append("rect").classed("selecttime", true).attr({
            "x": timeScale(new Date(d.weekdate)) + 30,
            "y": yScale(d.count),
            "width": timeScale(new Date(d.weekdate + milliWeek)) - timeScale(new Date(d.weekdate)),
            "height": 0,
            "id": "selecttime_" + d.weekdate.toString()
        });
    });
}

function syncDisplays() {
    if (linkSelectedCount < 1) {
//        d3.selectAll("line.link").attr("select_state", function () {
//            if (d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "selected"
//                    && d3.select("#" + d3.select(this).attr("link")).attr("select_state") === "selected") {
//                return "connected";
//            } else {
//                var ownerId = d3.select(this).attr("owner");
//                var linkId = d3.select(this).attr("link");
//                if ((d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "selected"
//                        || d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "preview")
//                        && (subjectUsers.has(ownerId) || !afterSearch)) {
//                    if (selectedCount === 1) {
//                        return (subjectUsers.has(linkId) || subjectUsers.size < 1 || d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "preview")
//                                ? (d3.select("#" + d3.select(this).attr("owner")).attr("select_state")) : "not_selected";
//                    } else {
//                        if (d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "preview") {
//                            return (subjectUsers.has(linkId) || subjectUsers.size < 1) ? "preview" : "not_selected";
//                        } else {
//                            return (subjectUsers.has(linkId) || subjectUsers.size < 1) ? "preview" : "not_selected";
//                        }
//                    }
//                } else {
//                    if (selectedCount > 0) {
//                        return "not_selected";
//                    } else {
//                        return "none";
//                    }
//                }
//            }
//        });
//        d3.selectAll("text.nodelabel").attr("select_state", function () {
//            return d3.select("#" + d3.select(this).attr("id")
//                    .replace("nodelabel_", "userrect_")).attr("select_state");
//        });
    }
//    d3.selectAll("line.link").each(function () {
//        if (d3.select(this).attr("select_state") !== "none" &&
//                d3.select(this).attr("select_state") !== "not_selected") {
//            toFront(d3.select(this), true);
//        }
//    });
    d3.selectAll("text.user").attr("select_state", function () {
        var thisRect = d3.select("#" + d3.select(this).attr("id")
                .replace("username_", "userrect_"));
        var state = thisRect.attr("select_state");
        return (selectedCount > 0 && state === "none") ? "not_selected"
                : (selectedCount <= 0 && state === "not_selected") ? "none"
                : state;
    });
    d3.selectAll("line.selectlink").each(function () {
        var lline = d3.select(this);
        lline.attr("x2", lline.attr("x1"));
    });
    d3.selectAll("line.previewlink").each(function () {
        var lline = d3.select(this);
        lline.attr("x2", lline.attr("x1"));
    });
    
//    for (var ii = 0; ii < 6; ii++) {
    d3.selectAll("line[class^='edge']").each(function () {
        var lline = d3.select(this);
        lline.attr("x2", lline.attr("x1"));
    });
//    }
    var selectedIds = [];
//    var totalSelectedLinks = 0;
//    var minSelectedCount = Number.MAX_VALUE;
//    var maxSelectedCount = 0.0;
    d3.selectAll("text.user[select_state=selected]").each(function () {
        selectedIds.push(d3.select(this).attr("id"));
//        var dat = d3.select(this).datum();
//        dat.links.forEach(function (d) {
//            totalSelectedLinks += d.count;
//            if (d.count < minSelectedCount) {
//                minSelectedCount = d.count;
//            }
//            if (d.count > maxSelectedCount) {
//                maxSelectedCount = d.count;
//            }
//        });
    });
//    if (minSelectedCount === totalSelectedLinks) {
//        minSelectedCount = .1;
//    }
//    var selectedScaleFactor = d3.scale.log()
//            .range([1, 4 * lineHeight]).domain([minSelectedCount, totalSelectedLinks]);
//
//    var previewIds = new Set();
//    var totalPreviewLinks = 0;
//    var minPreviewCount = Number.MAX_VALUE;
//    var maxPreviewCount = 0.0;
    d3.selectAll("text.user[select_state=preview]").each(function () {
        selectedIds.push(d3.select(this).attr("id"));
//        var dat = d3.select(this).datum();
//        dat.links.forEach(function (d) {
//            totalPreviewLinks += d.count;
//            if (d.count < minPreviewCount) {
//                minPreviewCount = d.count;
//            }
//            if (d.count > maxPreviewCount) {
//                maxPreviewCount = d.count;
//            }
//        });
    });
//    if (minPreviewCount === totalPreviewLinks) {
//        minPreviewCount = .1;
//    }
//    var previewScaleFactor = d3.scale.log()
//            .range([1, 4 * lineHeight]).domain([minPreviewCount, totalPreviewLinks]);
    selectedIds.forEach(function (d, i) {
        var lcolor = d3.select(d3.select("#" + d).node().parentNode).select("rect.user").attr("color");
        var links = d3.select("#" + d).datum().links;
        links.forEach(function (dd) {
            var lgroup = d3.select("#usergroup_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
            var lline = lgroup.select("line.edge" + lcolor);
            lline.attr("x2", function () {
                return parseInt(lline.attr("x1")) + edgeScaleFactor(dd.count);
            });
        });
    });
//    previewIds.forEach(function (d) {
//        var lcolor = d3.select(d3.select("#" + d).node().parentNode).select("rect.user").attr("color");
//        var links = d3.select("#" + d).datum().links;
//        links.forEach(function (dd) {
//            var lgroup = d3.select("#usergroup_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
//            var lline = lgroup.select("line.edge" + lcolor);
//            lline.attr("x2", function () {
//                return parseInt(lline.attr("x1")) + edgeScaleFactor(dd.count);
//            });
//        });
//    });
//    d3.selectAll("circle.user").attr("select_state", function () {
//        return d3.select("#" + d3.select(this).attr("id")
//                .replace("node_", "userrect_")).attr("select_state");
//    });
//    toFront(svgarc.selectAll("user.circle"));
//    timeLines(svgarc);
}
