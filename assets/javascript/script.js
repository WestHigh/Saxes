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
            <div class="name-container"><p>${member.name.first + " " + member.name.last}</p></div>\
            <div class="badge">${member.grade}</div>\
            ${member.badges ? (member.badges.map((badge) => {
                return `<div class="badge">${badge}</div>`
            }).join("")) : ""}\
            ${member.importantBadge ? (`<div class="badge-important"><p>${member.importantBadge}</p></div>`) : ""}\
        </div>`);
        div.append(card);

        if (member.profile.match(regex)) {
            $(`.cards .card#${member.name.first}`).hover(function () {
                $(`.cards .card#${member.name.first}`).css("background-image", `url(${member.profile})`);
            }, function() {
                $(`.cards .card#${member.name.first}`).css("background-image", `url(${image})`);
            });
        }

        new jBox('Modal', {
            attach: `#${member.name.first}`,
            width: 600,
            theme: "TooltipDark",
            content: `<img style="border-radius: 50%;" src="${member.profile}"><br /><br /><h1>${member.name.first} ${member.name.last}</h1><p class="bio">${formatDescription(member, type)}</p>`,
        });
    });
}

function formatDescription(member, type) {
    let str;
    if (type === "leader") {
        str = `${member.name.first} ${member.name.last} is a ${member.grade} and is the West High Entertainment Unit ${member.importantBadge} for the 2021 - 2022 school year. \
        ${member.pronoun[0].toUpperCase() + member.pronoun.slice(1)} plays ${member.sax} sax${member.bio ? ", and " : "."}`
    } else if (type === "tenor") {
        str = `${member.name.first} ${member.name.last} is a ${member.grade} and plays Tenor sax for the West High Entertainment Unit.`
    } else if (type === "alto") {
        let part = member.badges[0];
        str = `${member.name.first} ${member.name.last} is a ${member.grade} and plays Alto sax (part ${part[part.length - 1]}) for the West High Entertainment Unit.`
    }
    str = member.bio ? str + ` ${member.bio}` : str;
    return str;
}