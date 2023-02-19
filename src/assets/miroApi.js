async function addSticky(text) {
    return await miro.board.createStickyNote({
        content: text,
    });
}

async function zoomTo(item) {
    await miro.board.viewport.zoomTo(item);
}

async function addImageRightOfStickyNote(url, stickyNote) {
    return await miro.board.createImage({
        title: 'This is an image',
        url: url,
        x: stickyNote.x + stickyNote.width + 50,
        y: stickyNote.y,
        width: stickyNote.width,
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

export {addSticky, zoomTo, addImageRightOfStickyNote, connectTwoItems};