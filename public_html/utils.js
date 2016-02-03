/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Moves all elements of the given selection to either the front or the back of the parent's children list resulting in
 * different visibility.
 *
 * @param sel
 *          The d3 selection to move.
 * @param toFront
 *          Whether to move to the front or to the back.
 */
function toFront(sel, toFront) {
    sel.each(function () {
        var obj = this;
        var parent = obj.parentElement;
        if (toFront) {
            parent.appendChild(obj);
        } else {
            parent.insertBefore(obj, parent.firstChild);
        }
    });
}

function redrawElements(sel) {
    sel.each(function () {
        document.getElementById(this).style.display = 'none';
        document.getElementById(this).style.display = 'block';
    });
}

function cloudList() {
    if (d3.select("#listtype").node().value === "cloud") {
        toFront(d3.select("#clouddiv"), true);
    } else {
        toFront(d3.select("#detaildiv"), true);
    }
}

//document.getElementById('parentOfElementToBeRedrawn').style.display = 'none';
//document.getElementById('parentOfElementToBeRedrawn').style.display = 'block';

function selectBox(svg, owner, x, y, type) {
    var thisBox = svg.append("rect").classed("select", true)
            .attr({
                "x": x,
                "y": y,
                "width": 10,
                "height": 10,
                "rx": 2,
                "ry": 2,
                "owner": owner,
                "type": type,
                "checked": "no"
            });
    var thisPath = svg.append("path").classed("select", true)
            .attr({
                "d": "M " + (x + 2) + " " + (y + 6) + "L " + (x + 4) + " " + (y + 8) + "L " + (x + 8) + " " + (y + 2),
                "owner": owner,
                "checked": "no"
            });

    svg.append("rect").classed("select", true)
            .attr({
                "x": x,
                "y": y,
                "width": 10,
                "height": 10,
                "rx": 2,
                "ry": 2
            }).on("click", function () {
        thisBox.attr({
            "checked": (thisBox.attr("checked") === "no") ? "yes" : "no"
        });
        thisPath.attr({
            "checked": (thisPath.attr("checked") === "no") ? "yes" : "no"
        });
        d3.select(".delete[owner=" + thisBox.attr("owner")).attr({
            "checked": "no"
        });
    });
}

function deleteBox(parent, owner, x, y, type) {
    var thisLine = parent.append("line").classed("delete", true)
            .attr({
                "x1": x + 2,
                "x2": x + 8,
                "y1": y + 5,
                "y2": y + 5,
                "owner": owner,
                "checked": "no"
            });
    parent.append("rect").classed("delete", true)
            .attr({
                "x": x,
                "y": y,
                "width": 10,
                "height": 10,
                "rx": 2,
                "ry": 2,
                "owner": owner,
                "type": type,
                "checked": "no"
            }).on("click", function () {
        var thisBox = d3.select(this);
        switch (thisBox.attr("type")) {
            case "user" :
                removeUser(d3.select("#" + thisBox.attr("owner")));
                break;
            case "subject" :
                removeSubject(d3.select("#" + thisBox.attr("owner")));
                break;
            default :
                break;
        }
    });
}

function searchSelect(where) {
    searchRange = where;
}

function headSelect(show) {
    showHeaders = (show === "true") ? true : false;
}

function maxSelect(count) {
    maxUserCount = parseInt(count);
    setupDisplays('true', []);
}

function keyHandler(key) {
    var temp = selectedSubjects.pop();
    var next = null;
    if (key === 40) {
        next = d3.select(temp.node().nextSibling);
    } else if (key === 38) {
        next = d3.select(temp.node().previousSibling);
    } else if (key === 32) {
        next = d3.select(temp.node().nextSibling);
        if (next === null) {
            next = d3.select(temp.node().previousSibling);
        }
        removeSubject(temp);
    }
    if (next.node() !== null) {
        temp.select("text").attr({
            "highlight": "no"
        });
        temp.select("rect.subjectSelected").remove();
        var emailList = [];
        var i = 0;
        next.select("text").attr({
            "highlight": "yes"
        });
        var group = next;
        group.insert("rect", ":first-child")
                .classed("subjectSelected", true)
                .attr({
                    "x": 0,
                    "y": function () {
                        return (parseInt(next.select("text.subject")
                                .attr("y")) - 0.5 * lineHeight);
                    },
                    "width": parseInt(svgdivdetail.style("width")),
                    "height": lineHeight
                });
        selectedSubjects.push(next);
        next.datum().docidlist.forEach(function (e) {
            emailList[i++] = e.toString();
        });
//        console.log(svgdivdetail.node().scrollTop);
//        console.log(svgdivdetail.node().scrollHeight);
//        console.log(svgdivdetail.style("height"));
        if (parseInt(next.select("text").attr("y")) + 0.5 * lineHeight >
                parseInt(svgdivdetail.node().scrollTop) + parseInt(svgdivdetail.style("height"))) {
            svgdivdetail.node().scrollTop = svgdivdetail.node().scrollTop + lineHeight;
        } else if (parseInt(next.select("text").attr("y")) - 0.5 * lineHeight <
                parseInt(svgdivdetail.node().scrollTop)) {
            svgdivdetail.node().scrollTop = Math.max(
                    svgdivdetail.node().scrollTop - lineHeight, 0);
        }
        displayemails(emailList, next.datum().subject);
    } else {
        selectedSubjects.push(temp);
    }
}