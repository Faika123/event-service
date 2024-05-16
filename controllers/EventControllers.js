const db = require('../config/database');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, ".\assets\img");
		cb(null, "C:\Users\ASUS\faika\src\assets\img");
	},
	filename: function (req, file, cb) {
		return cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
	}
});

exports.ajouterEvent = (req, res) => {
    const { titre, description, prix, lieu, places_disponibles, date_deb, date_fin, categorie_id, photo_url } = req.body;
    if (!titre || !description || !prix || !lieu || !places_disponibles || !date_deb || !date_fin || !categorie_id || !photo_url) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    db.query('INSERT INTO evenement (titre, description, prix, lieu, places_disponibles, date_deb, date_fin, categorie_id, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [titre, description, prix, lieu, places_disponibles, date_deb, date_fin, categorie_id, photo_url], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(201).json({ message: 'Événement ajouté avec succès.' });
    });
};


exports.getEventById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM evenement WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aucune evenement trouvée avec cet ID.' });
        }

        return res.status(200).json(result[0]);
    });
};


exports.listerEvent = (req, res) => {
    db.query('SELECT * FROM evenement', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        return res.status(200).json(result);
    });
};

exports.modifierEvent = (req, res) => {
    const { titre, description, prix, lieu, places_disponibles, date_deb, date_fin, categorie_id, photo_url } = req.body;
    const id = req.params.id;

    if (!titre || !description || !prix || !lieu || !places_disponibles || !date_deb || !date_fin || !categorie_id || !photo_url) {
        return res.status(400).json({ message: 'Tous les champs sont requis pour la modification.' });
    }

    db.query('UPDATE evenement SET titre = ?, description = ?, prix = ?, lieu = ?, places_disponibles = ?, date_deb = ?, date_fin = ?, categorie_id = ?, photo_url = ?  WHERE id = ?', 
        [titre, description, prix, lieu, places_disponibles, date_deb, date_fin, categorie_id, photo_url, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucun événement trouvé avec cet ID.' });
        }

        return res.status(200).json({ message: 'Événement modifié avec succès.' });
    });
};


exports.supprimerEvent = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM evenement WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucun evenement trouvé avec cet ID.' });
        }

        return res.status(200).json({ message: 'evenement supprimé avec succès.' });
    });
};

exports.rechercherEvent = (req, res) => {
    const { titre, description, lieu } = req.query;
    let conditions = [];
    let params = [];

    if (titre) {
        conditions.push('titre LIKE ?');
        params.push(`%${titre}%`);
    }
    if (description) {
        conditions.push('description LIKE ?');
        params.push(`%${description}%`);
    }
    if (lieu) {
        conditions.push('lieu LIKE ?');
        params.push(`%${lieu}%`);
    }
    if (conditions.length === 0) {
        return res.status(400).json({ message: 'Au moins un critère de recherche est requis.' });
    }

    const whereClause = conditions.join(' AND ');

    db.query(`SELECT * FROM evenement WHERE ${whereClause}`, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(200).json(result);
    });
};

exports.listerCategories = (req, res) => {
    db.query('SELECT * FROM categorie', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(200).json(result);
    });
};

exports.getCategorieById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM categorie WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aucune catégorie trouvée avec cet ID.' });
        }

        return res.status(200).json(result[0]);
    });
};

exports.ajouterCategorie = (req, res) => {
    const { nom, description } = req.body;
    if (!nom || !description) {
        return res.status(400).json({ message: 'Le nom de la catégorie est requis.' });
    }

    db.query('INSERT INTO categorie (nom, description) VALUES (?, ?)', [nom, description], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        return res.status(201).json({ message: 'Catégorie ajoutée avec succès.' });
    });
};

exports.modifierCategorie = (req, res) => {
    const id = req.params.id;
    const { nom, description} = req.body;
    if (!nom || !description) {
        return res.status(400).json({ message: 'Le nom de la catégorie est requis pour la modification.' });
    }

    db.query('UPDATE categorie SET nom = ?, description = ? WHERE id = ?', [nom,description, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucune catégorie trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'Catégorie modifiée avec succès.' });
    });
};

exports.supprimerCategorie = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM categorie WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Aucune catégorie trouvée avec cet ID.' });
        }

        return res.status(200).json({ message: 'Catégorie supprimée avec succès.' });
    });
};
exports.rechercherCategorie = (req, res) => {
  const { nom } = req.query;
  let conditions = [];
  let params = [];

  if (nom) {
      conditions.push('nom LIKE ?');
      params.push(`%${nom}%`);
  }

  if (conditions.length === 0) {
      return res.status(400).json({ message: 'Au moins un critère de recherche est requis.' });
  }

  const whereClause = conditions.join(' AND ');

  db.query(`SELECT * FROM categorie WHERE ${whereClause}`, params, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
      }

      if (result.length === 0) {
          return res.status(404).json({ message: 'Aucune catégorie trouvée avec ce nom.' });
      }

      return res.status(200).json(result);
  });
};
exports.listerEvenementsParCategorie = (req, res) => {
    const categorieId = req.params.id;

    db.query('SELECT * FROM evenement WHERE categorie_id = ?', [categorieId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Aucun événement trouvé pour cette catégorie.' });
        }

        return res.status(200).json(result);
    });
};
