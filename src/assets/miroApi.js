async function addSticky(text, color) {
    return await miro.board.createStickyNote({
        content: text,
        style: {
            fillColor: color ? color : 'light_blue',
            textAlign: "center",
            textAlignVertical: "top",
        },
    });
}

async function addStickyRightOfAnotherSticky(text, color, stickyNote) {
    return await miro.board.createStickyNote({
        content: text,
        x: stickyNote ? stickyNote.x + stickyNote.width + 10 : 0,
        y: stickyNote ? stickyNote.y : 0,
        style: {
            fillColor: color ? color : 'light_blue',
            textAlign: "center",
            textAlignVertical: "top",
        },
    });
}


async function zoomTo(item) {
    await miro.board.viewport.zoomTo(item);
}

async function addImageRightOfStickyNote(url, stickyNote) {
    return await miro.board.createImage({
        title: 'This is an image',
        url: url,
        x: stickyNote.x + stickyNote.width + 100,
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

export {addSticky, addStickyRightOfAnotherSticky, zoomTo, addImageRightOfStickyNote, connectTwoItems, };