import Swal from "sweetalert2";
import img from "../assets/kkkkk.png";

export const AlertPage = (expirationDate) => {
  const dateMsg = new Date(expirationDate).toLocaleDateString();

  Swal.fire({
    title: "<strong>📢 Information Importante / Important Info</strong>",
    icon: "info",
    html: `
      <div style="text-align:center; margin-left:auto; margin-right:auto;">
        <img src="${img}" alt="Preview" style="width:100%;max-width:300px;margin-bottom:15px;" />
      </div>
      <div style="text-align:left;">
        <p>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png" alt="FR" style="width:30px;vertical-align:middle;margin-right:8px;">
          <b>Français :</b><br/>
          Ceci est une extension qui va expirer le <b>${dateMsg}</b>.<br/>
          Pour que cela fonctionne, changez la langue en <b>ENG</b> et activez la <b>notation en texte</b>.<br/>
          Plus d'informations sont disponibles dans le fichier <i>README</i>.<br/>
          Cliquez sur "Effacer" dans l'application pour supprimer les flèches restantes.<br/><br/>
          ✨ <b>Nouvelle fonctionnalité :</b><br/>
          Vous pouvez maintenant voir une ligne avec <b>10 coups d'avance</b> pour explorer une suite idéale si l’adversaire ne fait pas d’erreur.<br/>
          Appuyez sur <b>Go Back</b> pour revenir à votre position initiale.
        </p>
        <p><b>Vais-je être banni en l'utilisant ?</b><br/>
        - Oui, mais vous pouvez l'éviter. Voir ci-dessous.<br/>
        <b>Comment éviter d'être banni ?</b><br/>
        - Ils détectent les tricheurs via plusieurs facteurs : temps de coup, précision, taux de victoire.<br/>
        - Temps de coup : Ne jouez pas tous vos coups avec un délai identique. Un recoup simple peut être joué vite, un sacrifice complexe doit sembler réfléchi.<br/>
        - Précision : Ne jouez pas toujours les meilleurs coups. Faites quelques erreurs pour baisser votre précision.<br/>
        - Taux de victoire : Ne dépassez pas 80%. Perdez volontairement parfois.
        </p>
        <hr/>
        <p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" alt="EN" style="width:30px;vertical-align:middle;margin-right:8px;">
          <b>English:</b><br/>
          This extension will expire on <b>${dateMsg}</b>.<br/>
          For it to work, switch the language to <b>ENG</b> and set <b>notation to text</b>.<br/>
          More details are in the <i>README</i> file.<br/>
          Use the "Clear" button in the app to remove any leftover arrows.<br/><br/>
          ✨ <b>New feature:</b><br/>
          You can now preview a <b>10-move line</b> to see how the game might go if the opponent doesn’t blunder.<br/>
          Press <b>Go Back</b> to return to your original position.
        </p>
        <p><b>Will I get banned from using this?</b><br/>
        - Yes, but you can avoid it. See below.<br/>
        <b>How do I avoid getting banned?</b><br/>
        - They detect cheaters based on several factors: Move time, accuracy, win rate.<br/>
        - Move time: Don’t take the same time for every move. Play simple moves quickly, and think longer on hard ones.<br/>
        - Accuracy: Don’t always play the best moves. Make blunders occasionally to reduce your accuracy.<br/>
        - Win rate: Keep your win rate below 80%. Intentionally lose sometimes.
        </p>
      </div>
    `,
    confirmButtonText: "OK",
    showCloseButton: false
  });
};
