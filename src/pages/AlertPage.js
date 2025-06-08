import Swal from "sweetalert2";

export const AlertPage = (expirationDate) => {
  const dateMsg = new Date(expirationDate).toLocaleDateString();

  Swal.fire({
    title: "<strong>📢 Information Importante / Important Info</strong>",
    icon: "info",
    html: `
      <img src="https://media1.tenor.com/m/e-msDFGlCU0AAAAC/hello.gif" alt="Welcome" style="width:100%;max-width:300px;margin-bottom:15px;" />
      
      <div style="text-align:left;">
        <p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png" alt="FR" style="width:30px;vertical-align:middle;margin-right:8px;">
          <b>Français :</b><br/>
          Ceci est une extension qui va expirer le <b>${dateMsg}</b>.<br/>
          Pour que cela fonctionne, changez la langue en <b>ENG</b> et activez la <b>notation en texte</b>.<br/>
          Plus d'informations sont disponibles dans le fichier <i>README</i>.<br/>
          Cliquez sur "Effacer" dans l'application pour supprimer les flèches restantes.
        </p>
        <hr/>
        <p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="EN" style="width:30px;vertical-align:middle;margin-right:8px;">
          <b>English:</b><br/>
          This extension will expire on <b>${dateMsg}</b>.<br/>
          For it to work, switch the language to <b>ENG</b> and set <b>notation to text</b>.<br/>
          More details are in the <i>README</i> file.<br/>
          Use the "Clear" button in the app to remove any leftover arrows.
        </p>
      </div>
    `,
    confirmButtonText: "OK",
    showCloseButton: false
  });
};
