async function createMiroMindTag() {
    return await miro.board.createTag({
        title: 'Miro Mind',
        color: 'green',
    });
}

async function getAllBoardTags(apiKey) {
    const boardInfo = await miro.board.getInfo()
    return await (await fetch('https://api.miro.com/v2/boards/' + boardInfo.id + '/tags', {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        }
    })).json();
}

async function addSticky(text, color, tag, x, y) {
    return await miro.board.createStickyNote({
        content: text,
        style: {
            fillColor: color ? color : 'light_blue',
            textAlign: "center",
            textAlignVertical: "top",
        },
        tagIds: tag ? [tag.id] : [],
        x: x ? x : 0,
        y: y ? y : 0
    });
}

async function addStickyRightOfAnotherSticky(text, color, stickyNote, tag) {
    return await miro.board.createStickyNote({
        content: text,
        x: stickyNote ? stickyNote.x + stickyNote.width + 30 : 0,
        y: stickyNote ? stickyNote.y : 0,
        style: {
            fillColor: color ? color : 'light_blue',
            textAlign: "center",
            textAlignVertical: "top",
        },
        tagIds: tag ? [tag.id] : []
    });
}


async function zoomTo(items) {
    await miro.board.viewport.zoomTo(items);
}

async function addImageRightOfStickyNote(url, stickyNote) {
    return await miro.board.createImage({
        title: 'This is an image',
        url: url,
        x: stickyNote ? stickyNote.x + stickyNote.width + 10 : 0,
        y: stickyNote ? stickyNote.y : 0,
        rotation: 0.0,
    })
}

async function connectTwoItems(firstItem, secondItem) {
    if (firstItem === undefined || secondItem === undefined) {
        return
    }
    await miro.board.createConnector({
        shape: 'curved',
        start: {
            item: firstItem.id,
            snapTo: 'right',
        },
        end: {
            item: secondItem.id,
            snapTo: 'left',
        },
    });
}

export {
    addSticky,
    addStickyRightOfAnotherSticky,
    zoomTo,
    addImageRightOfStickyNote,
    connectTwoItems,
    createMiroMindTag,
    getAllBoardTags
};