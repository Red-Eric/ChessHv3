import { useNavigate } from "react-router-dom";
import imgLang from "../assets/0.png";
import imgNot1 from "../assets/1.png";
import imgNot2 from "../assets/2.png";

export const Tuto = () => {

    const navigate = useNavigate()
    return (
        <div className="bg-slate-800 min-h-screen py-10 px-4 text-white font-mono">
            <h1 className="text-4xl font-bold text-center mb-10">📘 Tutoriel / Tutorial</h1>

            <div className="w-full max-w-2xl mx-auto space-y-10">
                {/* Étape 1 */}
                <div className="bg-slate-700 p-4 rounded-2xl shadow-lg hover:bg-slate-600 transition">
                    <img src={imgLang} alt="Langue" className="rounded-md mb-3" />
                    <div className="space-y-1">
                        <p className="text-lg">🇫🇷 1 – Change la langue en <span className="font-bold text-blue-300">ANGLAIS</span></p>
                        <p className="text-lg">🇬🇧 1 – Change the language to <span className="font-bold text-blue-300">ENGLISH</span></p>
                    </div>
                </div>

                {/* Étape 2 */}
                <div className="bg-slate-700 p-4 rounded-2xl shadow-lg hover:bg-slate-600 transition">
                    <img src={imgNot1} alt="Notation" className="rounded-md mb-3" />
                    <div className="space-y-1">
                        <p className="text-lg">🇫🇷 2 – Passe la <span className="font-bold text-yellow-300">notation des pièces</span> en texte</p>
                        <p className="text-lg">🇬🇧 2 – Set the <span className="font-bold text-yellow-300">piece notation</span> to text</p>
                    </div>
                </div>

                {/* Étape 3 */}
                <div className="bg-slate-700 p-4 rounded-2xl shadow-lg hover:bg-slate-600 transition">
                    <img src={imgNot2} alt="Paramètres" className="rounded-md mb-3" />
                    <div className="space-y-1">
                        <p className="text-lg">
                            🇫🇷 3 – Respecte ces paramètres, <span className="italic">n’utilise pas</span> l’animation :
                            <span className="font-bold text-red-400"> Arcade</span> ou <span className="font-bold text-green-400">Nature</span>
                        </p>
                        <p className="text-lg">
                            🇬🇧 3 – Follow these settings, <span className="italic">do not use</span> the animation:
                            <span className="font-bold text-red-400"> Arcade</span> or <span className="font-bold text-green-400">Nature</span>
                        </p>
                    </div>
                </div>

                {/* Bouton Retour */}
                <div className="text-center pt-10">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:shadow-lg"
                    >
                        ⬅️ Retour / Back
                    </button>
                </div>
            </div>
        </div>
    );
};
