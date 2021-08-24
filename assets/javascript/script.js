$(document).ready(function () {
    new jBox('Tooltip', {
        attach: ".tooltip",
        theme: "TooltipDark"
    });

    addCards("Leadership", saxes.leaders, "cards-leaders", "leader");
    addCards("Tenors", saxes.tenors, "cards-tenors", "tenor");
    addCards("Altos", saxes.altos, "cards-altos", "alto");
});

function addCards(title, members, divId, type) {
    const div = $(`#${divId} .cards`);
    $(`#${divId}`).prepend(`<div class="cards-subheader">${title}</div>`);

    members.forEach((member) => {
        let image;
        let regex = /\.gif\?size/gi;
        if (member.profile.match(regex)) {
            image = member.profile.replace(regex, ".png?size");
        } else {
            image = member.profile
        }
        let card = $(`<div id="${member.name.first}" class="card ${type}" style="background-image: url(${image});">\
            <div class="text-container"><p>${member.name.first + " " + member.name.last}</p></div>\
        </div>`);
        div.append(card);

        if (member.profile.match(regex)) {
            $(`.cards .card#${member.name.first}`).hover(function () {
                $(`.cards .card#${member.name.first}`).css("background-image", `url(${member.profile})`);
            }, function() {
                $(`.cards .card#${member.name.first}`).css("background-image", `url(${image})`);
            });
        }
    });
}