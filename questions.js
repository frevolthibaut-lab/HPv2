export const questions=[
  [
    "establishment_name",
    "Nom de l’établissement",
    "text",
    1,
    "Identité"
  ],
  [
    "respondent_name",
    "Votre nom",
    "text",
    1,
    "Identité"
  ],
  [
    "respondent_role",
    "Votre fonction",
    "text",
    1,
    "Identité"
  ],
  [
    "respondent_email",
    "Email professionnel",
    "email",
    1,
    "Identité"
  ],
  [
    "respondent_phone",
    "Téléphone (facultatif)",
    "tel",
    0,
    "Identité"
  ],
  [
    "establishment_type",
    "Type d’établissement",
    "select",
    1,
    "Identité",
    [
      "Restaurant",
      "Bar / bar-restaurant",
      "Hôtel",
      "Lieu événementiel",
      "Groupe multi-sites",
      "Autre"
    ]
  ],
  [
    "site_count",
    "Nombre de sites",
    "number",
    0,
    "Identité"
  ],
  [
    "employee_count",
    "Effectif approximatif",
    "number",
    0,
    "Identité"
  ],
  [
    "capacity",
    "Capacité d’accueil approximative",
    "number",
    0,
    "Identité"
  ],
  [
    "annual_revenue_band",
    "CA annuel approximatif",
    "select",
    0,
    "Activité & performance",
    [
      "< 500 k€",
      "500–700 k€",
      "700 k€–1 M€",
      "1–2 M€",
      "2–5 M€",
      "> 5 M€",
      "Non communiqué"
    ]
  ],
  [
    "knows_avg_ticket",
    "Connaissez-vous votre ticket moyen actuel ?",
    "select",
    0,
    "Activité & performance",
    [
      "Oui",
      "Non"
    ]
  ],
  [
    "avg_ticket",
    "Ticket moyen (€), si connu",
    "number",
    0,
    "Activité & performance"
  ],
  [
    "kpi_frequency",
    "À quelle fréquence consultez-vous vos KPI ?",
    "select",
    0,
    "Activité & performance",
    [
      "Quotidiennement",
      "Chaque semaine",
      "Chaque mois",
      "Occasionnellement",
      "Jamais"
    ]
  ],
  [
    "margin_tracking",
    "Suivez-vous le coût matière / les marges ?",
    "select",
    0,
    "Activité & performance",
    [
      "Oui, régulièrement",
      "Partiellement",
      "Rarement",
      "Non"
    ]
  ],
  [
    "has_dashboard",
    "Disposez-vous d’un dashboard ou reporting de pilotage ?",
    "select",
    0,
    "Activité & performance",
    [
      "Oui, structuré et utilisé",
      "Oui, mais irrégulier",
      "Partiellement",
      "Non"
    ]
  ],
  [
    "productivity_tracking",
    "Comment suivez-vous la productivité (heures travaillées par rapport au CA / à l’activité) ?",
    "select",
    0,
    "Activité & performance",
    [
      "Suivi régulier avec ratios et objectifs",
      "Heures et CA suivis mais peu rapprochés",
      "Suivi occasionnel",
      "Pas de suivi"
    ]
  ],
  [
    "top_problems",
    "Quels sont aujourd’hui vos 3 principaux problèmes ou irritants ?",
    "textarea",
    1,
    "Priorités"
  ],
  [
    "six_month_priority",
    "Quel résultat souhaitez-vous prioritairement obtenir dans les 6 prochains mois ?",
    "textarea",
    1,
    "Priorités"
  ],
  [
    "biggest_time_waste",
    "Quelle tâche ou quel problème vous fait perdre le plus de temps chaque semaine ?",
    "textarea",
    0,
    "Priorités"
  ],
  [
    "management_routines",
    "Les responsables disposent-ils de routines de management (briefs, objectifs, points de suivi) ?",
    "select",
    0,
    "Priorités",
    [
      "Oui, formalisées et régulières",
      "Oui, régulières mais peu formalisées",
      "Partiellement / selon les responsables",
      "Très peu ou pas du tout"
    ]
  ],
  [
    "internal_communication",
    "Comment les consignes et informations opérationnelles sont-elles partagées ?",
    "select",
    0,
    "Priorités",
    [
      "Canal commun, routines et informations tracées",
      "Canal commun utilisé régulièrement",
      "Plusieurs canaux / fonctionnement variable",
      "Principalement à l’oral / non structuré"
    ]
  ],
  [
    "onboarding_process",
    "Comment se déroule l’intégration d’un nouveau collaborateur ?",
    "select",
    0,
    "Priorités",
    [
      "Parcours documenté et systématique",
      "Parcours défini mais partiellement documenté",
      "Transmission principalement informelle",
      "Pas de parcours défini"
    ]
  ],
  [
    "groups_significance",
    "Les groupes / entreprises / événements représentent-ils un enjeu significatif ?",
    "select",
    0,
    "Développement commercial",
    [
      "Oui, majeur",
      "Oui, secondaire",
      "Peu",
      "Pas actuellement"
    ]
  ],
  [
    "monthly_group_leads",
    "Nombre approximatif de demandes groupes / événements par mois",
    "number",
    0,
    "Développement commercial"
  ],
  [
    "knows_conversion",
    "Connaissez-vous votre taux devis → vente ?",
    "select",
    0,
    "Développement commercial",
    [
      "Oui, précisément",
      "Approximativement",
      "Non"
    ]
  ],
  [
    "response_delay",
    "Délai moyen de réponse commerciale",
    "select",
    0,
    "Développement commercial",
    [
      "< 2 h",
      "2–6 h",
      "Dans la journée",
      "24–48 h",
      "> 48 h",
      "Variable / inconnu"
    ]
  ],
  [
    "quote_followup",
    "Comment relancez-vous les devis non signés ?",
    "select",
    0,
    "Développement commercial",
    [
      "Process systématique",
      "Relances régulières mais non formalisées",
      "Occasionnellement",
      "Pas de relance structurée"
    ]
  ],
  [
    "acquisition_process",
    "Comment pilotez-vous l’acquisition de nouveaux clients ?",
    "select",
    0,
    "Développement commercial",
    [
      "Plusieurs canaux actifs avec résultats mesurés",
      "Plusieurs canaux actifs mais suivi irrégulier",
      "Acquisition surtout passive / bouche-à-oreille",
      "Pas de démarche d’acquisition structurée"
    ]
  ],
  [
    "pricing_review",
    "Comment faites-vous évoluer vos offres et vos prix ?",
    "select",
    0,
    "Développement commercial",
    [
      "Revue régulière basée sur marges, demande et données",
      "Revue régulière avec une partie des données",
      "Ajustements occasionnels surtout intuitifs",
      "Prix et offres très rarement revus"
    ]
  ],
  [
    "loyalty_tracking",
    "Comment suivez-vous la fidélisation et la récurrence client ?",
    "select",
    0,
    "Développement commercial",
    [
      "Suivi structuré avec données / CRM et actions",
      "Suivi partiel avec quelques actions",
      "Suivi principalement informel",
      "Pas de suivi de la fidélisation"
    ]
  ],
  [
    "procedures_documented",
    "Vos procédures clés sont-elles documentées ?",
    "select",
    0,
    "Opérations",
    [
      "Oui, largement",
      "Partiellement",
      "Très peu",
      "Non"
    ]
  ],
  [
    "runs_without_owner",
    "L’établissement peut-il fonctionner plusieurs jours sans intervention du dirigeant ?",
    "select",
    0,
    "Opérations",
    [
      "Oui, sans difficulté",
      "Oui, avec quelques sollicitations",
      "Difficilement",
      "Non"
    ]
  ],
  [
    "service_friction",
    "Quel est le principal point de friction pendant le service ?",
    "textarea",
    0,
    "Opérations"
  ],
  [
    "flow_process",
    "Dans quelle mesure les flux de service (accueil, commande, production, encaissement, débarrassage) sont-ils structurés ?",
    "select",
    0,
    "Opérations",
    [
      "Flux définis, suivis et régulièrement optimisés",
      "Flux globalement structurés avec quelques variations",
      "Fonctionnement surtout basé sur les habitudes",
      "Dysfonctionnements récurrents / flux non définis"
    ]
  ],
  [
    "planning_process",
    "Comment construisez-vous les plannings d’équipe ?",
    "select",
    0,
    "Opérations",
    [
      "À partir des prévisions d’activité et d’objectifs de productivité",
      "À partir des prévisions d’activité, sans objectif de productivité formalisé",
      "Principalement selon les habitudes / disponibilités",
      "Sans méthode structurée"
    ]
  ],
  [
    "pos_tool",
    "Caisse / POS — quel outil utilisez-vous ? (ex. Cashpad, Lightspeed, Zelty, L’Addition…)",
    "text",
    0,
    "Outils & données"
  ],
  [
    "reservation_tool",
    "Réservations / gestion des tables — quel outil utilisez-vous ? (ex. Zenchef, TheFork, SevenRooms…)",
    "text",
    0,
    "Outils & données"
  ],
  [
    "planning_hr_tool",
    "Planning / RH — quel outil utilisez-vous ? (ex. Skello, Combo, Snapshift…)",
    "text",
    0,
    "Outils & données"
  ],
  [
    "accounting_tool",
    "Comptabilité / facturation — quel outil utilisez-vous ? (ex. Pennylane, Sage, Indy…)",
    "text",
    0,
    "Outils & données"
  ],
  [
    "stock_purchasing_tool",
    "Stocks / achats / coût matière — quel outil utilisez-vous ? (ex. Inpulse, Easilys, Yokitup…)",
    "text",
    0,
    "Outils & données"
  ],
  [
    "crm_commercial_tool",
    "CRM / devis / groupes / événements — quel outil utilisez-vous ?",
    "text",
    0,
    "Outils & données"
  ],
  [
    "reporting_tool",
    "Reporting / tableaux de bord / analyse — quel outil utilisez-vous ?",
    "text",
    0,
    "Outils & données"
  ],
  [
    "other_tools",
    "Autres outils importants utilisés dans l’établissement",
    "textarea",
    0,
    "Outils & données"
  ],
  [
    "double_entry",
    "Avez-vous des doubles saisies ou copier-coller entre outils ?",
    "select",
    0,
    "Outils & données",
    [
      "Oui, fréquemment",
      "Oui, parfois",
      "Très peu",
      "Non"
    ]
  ],
  [
    "existing_automation",
    "Quelles tâches sont déjà automatisées ?",
    "textarea",
    0,
    "Outils & données"
  ],
  [
    "automation_maturity",
    "Quel est aujourd’hui votre niveau d’automatisation ?",
    "select",
    0,
    "Outils & données",
    [
      "Plusieurs automatisations fiables entre les outils",
      "Quelques automatisations régulières",
      "Une ou deux automatisations simples",
      "Aucune automatisation"
    ]
  ],
  [
    "consolidated_reporting",
    "À quelle fréquence disposez-vous d’un reporting consolidé ?",
    "select",
    0,
    "Outils & données",
    [
      "Temps réel / quotidien",
      "Hebdomadaire",
      "Mensuel",
      "Irrégulier",
      "Jamais"
    ]
  ],
  [
    "shareable_data",
    "Quelles données pourriez-vous partager pour le diagnostic ?",
    "textarea",
    0,
    "Outils & données"
  ],
  [
    "upcoming_constraints",
    "Y a-t-il une contrainte ou un projet à venir à intégrer à l’analyse ?",
    "textarea",
    0,
    "Outils & données"
  ]
];
