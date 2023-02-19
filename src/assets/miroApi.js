const MIRO_API_ACCESS_TOKEN = 'eyJtaXJvLm9yaWdpbiI6ImV1MDEifQ_h_BuYFj_66EagPbc8sXuhsbmf1E'

async function createMiroMindTag() {
    return await miro.board.createTag({
        title: 'Miro Mind',
        color: 'green',
    });
}

async function getAllBoardTags() {
    const boardInfo = await miro.board.getInfo()
    return await (await fetch('https://api.miro.com/v2/boards/' + boardInfo.id + '/tags', {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + MIRO_API_ACCESS_TOKEN
        }
    })).json();
}

async function addSticky(text, color, tag) {
    return await miro.board.createStickyNote({
        content: text,
        style: {
            fillColor: color ? color : 'light_blue',
            textAlign: "center",
            textAlignVertical: "top",
        },
        tagIds: tag ? [tag.id] : []
    });
}

async function addStickyRightOfAnotherSticky(text, color, stickyNote, tag) {
    return await miro.board.createStickyNote({
        content: text,
        x: stickyNote ? stickyNote.x + stickyNote.width + 10 : 0,
        y: stickyNote ? stickyNote.y : 0,
        style: {
            fillColor: color ? color : 'light_blue',
            textAlign: "center",
            textAlignVertical: "top",
        },
        tagIds: tag ? [tag.id] : []
    });
}


async function zoomTo(item) {
    await miro.board.viewport.zoomTo(item);
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
    return await miro.board.createConnector({
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