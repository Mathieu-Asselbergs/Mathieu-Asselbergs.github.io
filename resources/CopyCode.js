async function copyCode(codeCell) {
    // Copy code cell contents to user clipboard
    const code = codeCell.getElementsByClassName("cellContents").item(0).textContent;
    await navigator.clipboard.writeText(code);
    console.log("The code has been copied to your clipboard.");

    // Start "Copied!" animation
    copyConfirmation = codeCell.getElementsByTagName("h3").item(0);
    codeCell.style.animation = "screen-flash 0.5s";
    copyConfirmation.style.animation = "copy-confirmation 1s";

    // Reset animation to nothing
    copyConfirmation.addEventListener("animationend", () => {
        codeCell.style.animation = "";
        copyConfirmation.style.animation = "";
    });
}