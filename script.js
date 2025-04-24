const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

    function caricaPiatti() {
      const salvati = localStorage.getItem("piattiMenu");
      if (salvati) return JSON.parse(salvati);
      return [
        { nome: "Pita farcita", ingredienti: ["pane pita", "salumi", "formaggio"], stagione: "autunno-inverno" },
        { nome: "Hamburger con patatine", ingredienti: ["hamburger", "pane", "patatine fritte"], stagione: "autunno-inverno" },
        { nome: "Pollo alla piastra con purè di patate", ingredienti: ["petto di pollo", "purè liofilizzato", "latte"], stagione: "autunno-inverno" },
        { nome: "Salsiccia in padella con fagiolini saltati", ingredienti: ["salsicce", "fagiolini", "cipolla", "brodo di verdura granulare"], stagione: "autunno-inverno" },
        { nome: "Filetto di salmone in tegame con insalata", ingredienti: ["filetto di salmone", "insalata"], stagione: "autunno-inverno" },
        { nome: "Frittata al burro con pane tostato", ingredienti: ["uova", "pane a fette", "burro"], stagione: "autunno-inverno" },
        { nome: "Risotto ai funghi", ingredienti: ["riso", "funghi liofilizzati", "brodo"], stagione: "autunno-inverno" },
        { nome: "Spezzatino di vitello con polenta", ingredienti: ["vitello", "passato di pomodoro", "soffritto di cipolla", "vino rosso", "brodo di carne"], stagione: "autunno-inverno" }
      ];
    }

    let piatti = caricaPiatti();

    function salvaPiatti() {
      localStorage.setItem("piattiMenu", JSON.stringify(piatti));
    }

    function generaMenuCasuale() {
      const stagioneScelta = document.getElementById("stagioneMenu").value;
      const menuDiv = document.getElementById("menu");
      menuDiv.innerHTML = "";
      const piattiDisponibili = piatti.filter(p => p.stagione === stagioneScelta);

      if (piattiDisponibili.length < 7) {
        menuDiv.innerHTML = `<p class='text-red-500 font-semibold'>Non ci sono abbastanza piatti per questa stagione.</p>`;
        return;
      }

      const copiaPiatti = [...piattiDisponibili];
      for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * copiaPiatti.length);
        const piatto = copiaPiatti.splice(randomIndex, 1)[0];

        const card = document.createElement("div");
        card.className = "border rounded-lg p-4 shadow bg-white";

        const titolo = document.createElement("h2");
        titolo.className = "text-xl font-semibold";
        titolo.textContent = `${giorniSettimana[i]}: ${piatto.nome}`;
        card.appendChild(titolo);

        const ingTitle = document.createElement("p");
        ingTitle.className = "mt-2 font-medium";
        ingTitle.textContent = "Ingredienti:";
        card.appendChild(ingTitle);

        const ingList = document.createElement("ul");
        ingList.className = "list-disc ml-6";
        piatto.ingredienti.forEach(ing => {
          const li = document.createElement("li");
          li.textContent = ing;
          ingList.appendChild(li);
        });
        card.appendChild(ingList);

        menuDiv.appendChild(card);
      }
    }

    function aggiornaDropdownPiatti() {
      const select = document.getElementById("selezionaPiatto");
      select.innerHTML = "";
      piatti.forEach((p, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${p.nome} (${p.stagione})`;
        select.appendChild(option);
      });
    }

    function eliminaPiattoSelezionato() {
      const select = document.getElementById("selezionaPiatto");
      const index = select.value;
      if (index !== "") {
        piatti.splice(index, 1);
        salvaPiatti();
        aggiornaDropdownPiatti();
      }
    }

    function aggiungiPiatto() {
      const nome = document.getElementById("nomePiatto").value.trim();
      const ingredientiInput = document.getElementById("ingredientiPiatto").value.trim();
      const stagione = document.getElementById("stagionePiatto").value;

      if (!nome || !ingredientiInput) {
        alert("Inserisci sia il nome che gli ingredienti.");
        return;
      }

      const ingredientiArray = ingredientiInput.split(",").map(ing => ing.trim()).filter(ing => ing);
      piatti.push({ nome, ingredienti: ingredientiArray, stagione });
      salvaPiatti();
      document.getElementById("nomePiatto").value = "";
      document.getElementById("ingredientiPiatto").value = "";
      aggiornaDropdownPiatti();
      alert(`Piatto \"${nome}\" aggiunto!`);
    }

    generaMenuCasuale();
    aggiornaDropdownPiatti();