/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function rebuildDisplays(jData) {
    // First reset the user display to its correct state
    jData.deletedUsers.forEach(function (u) {
        removeUser(d3.select("#usergroup_" + u.replace(/[.@#]/g, "") + u.length.toString()));
    });
    jData.users.forEach(function (u) {
        var userRect = d3.select("#userrect_" + u.replace(/[\.@]/g, "") + u.length.toString());
        userRect.attr({
            "select_state": "selected"
        });
        userRect.datum().links.forEach(function (dd) {
            dd.dates.forEach(function (ddd) {
                var timerect = d3.select("#time_" + ddd.weekdate.toString());
                timerect.attr({
                    "selected-count": function () {
//                        console.log(parseInt(timerect.attr("selected-count"))
//                                + parseInt(ddd.count));
                        return parseInt(timerect.attr("selected-count"))
                                + parseInt(ddd.count);
                    }
                });
            });
            var linkrect = d3.select("#userrect_" + dd.link.replace(/[\.@]/g, "") + dd.link.length.toString());
            if (linkrect.node() !== null && (linkrect !== userRect)) {
                if (linkrect.attr("select_state") !== "selected" && linkrect.attr("select_state") !== "preview") {
                    linkrect.attr({
                        "select_state": function () {
                            return userRect.attr("select_state") === "remove" ? "remove" : "connected";
                        }
                    });
                }
            }
        });
        selectedCount++;
    });
    // Now clean up the arc display
    d3.selectAll("line.link").attr("select_state", function () {
        if (d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "selected"
                && d3.select("#" + d3.select(this).attr("link")).attr("select_state") === "selected") {
            return "connected";
        } else {
            if (d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "selected"
                    || d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "preview") {
                if (selectedCount === 1) {
                    return(d3.select("#" + d3.select(this).attr("owner")).attr("select_state"));
                } else {
                    if (d3.select("#" + d3.select(this).attr("owner")).attr("select_state") === "preview") {
                        return "preview";
                    } else {
                        return "selected";
                    }
                }
            } else {
                if (selectedCount > 0) {
                    return "not_selected";
                } else {
                    return "none";
                }
            }
        }
    });
    d3.selectAll("text.user").attr("select_state", function () {
        var state = d3.select("#" + d3.select(this).attr("id")
                .replace("username_", "userrect_")).attr("select_state");
        return (selectedCount > 0 && state === "none") ? "not_selected"
                : (selectedCount <= 0 && state === "not_selected") ? "none" : state;
    });
    d3.selectAll("text.nodelabel").attr("select_state", function () {
        return d3.select("#" + d3.select(this).attr("id")
                .replace("nodelabel_", "userrect_")).attr("select_state");
    });
    d3.selectAll("circle.user").attr("select_state", function () {
        return d3.select("#" + d3.select(this).attr("id")
                .replace("node_", "userrect_")).attr("select_state");
    });
    timeLines(svgarc);
    // Set up the subject Display
    jData.deletedSubjects.forEach(function (s) {
        deletedSubjects.add(s);
    });
    listSubjects();
}