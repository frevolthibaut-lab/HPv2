// Shared questionnaire schema: browser, validation and collective summary.
export const questionnaireVersion="hpv2_employee_90d_2026_10_28";
export const surveyQuestions=[
  {
    "n": "Q01",
    "title": "Difficultés de charge",
    "id": "org_workload_peaks",
    "label": "À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ?"
  },
  {
    "n": "Q02",
    "title": "Temps disponible",
    "id": "org_available_time",
    "label": "À quels moments disposez-vous régulièrement de temps qui pourrait être mieux utilisé ?"
  },
  {
    "n": "Q03",
    "title": "Pertes de temps",
    "id": "org_time_losses",
    "label": "Quelles sont les principales causes de perte de temps dans votre travail ?"
  },
  {
    "n": "Q04",
    "title": "Dépassements horaires",
    "id": "org_overtime",
    "label": "Sur les quatre dernières semaines, combien de fois avez-vous dépassé votre horaire de fin prévu ?"
  },
  {
    "n": "Q05",
    "title": "Modification d’organisation",
    "id": "org_improvement",
    "label": "Quelle modification d’organisation permettrait de mieux absorber l’activité avec les heures de travail disponibles ?"
  },
  {
    "n": "Q06",
    "title": "Demandes insatisfaites",
    "id": "offer_unmet_requests",
    "label": "Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ?"
  },
  {
    "n": "Q07",
    "title": "Renoncements clients",
    "id": "offer_lost_opportunities",
    "label": "Avez-vous observé des clients renoncer à une commande, une réservation ou une prestation ?"
  },
  {
    "n": "Q08",
    "title": "Offre à tester",
    "id": "offer_test_proposal",
    "label": "À partir des demandes réellement entendues, quelle offre faudrait-il tester en premier ?"
  },
  {
    "n": "Q09",
    "title": "Conditions de réalisation",
    "id": "offer_delivery_barriers",
    "label": "Qu’est-ce qui pourrait empêcher l’équipe de réaliser correctement cette nouvelle offre ?"
  },
  {
    "n": "Q10",
    "title": "Informations commerciales disponibles",
    "id": "offer_sales_information",
    "label": "Lorsqu’un client vous interroge sur les offres ou prestations de l’établissement, de quoi disposez-vous ?"
  },
  {
    "n": "Q11",
    "title": "Étapes réellement prévues",
    "id": "onboarding_steps",
    "label": "Lors de cette intégration, quels éléments étaient effectivement prévus ?"
  },
  {
    "n": "Q12",
    "title": "Tâches mises en difficulté",
    "id": "onboarding_difficult_tasks",
    "label": "Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ?"
  },
  {
    "n": "Q13",
    "title": "Critères d’autonomie",
    "id": "onboarding_autonomy_criteria",
    "label": "Qu’est-ce qui permettait de décider que le nouveau collaborateur pouvait travailler seul sur son poste ?"
  },
  {
    "n": "Q14",
    "title": "Accompagnement prioritaire",
    "id": "onboarding_support_priorities",
    "label": "Quel accompagnement aurait le plus facilité cette prise de poste ?"
  },
  {
    "n": "Q15",
    "title": "Problèmes signalés",
    "id": "customer_reported_problems",
    "label": "Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ?"
  },
  {
    "n": "Q16",
    "title": "Problème majeur et traitement",
    "id": "customer_main_issue",
    "label": "Quel problème dégrade le plus l’expérience client selon vos observations ?"
  },
  {
    "n": "Q17",
    "title": "Points forts à préserver",
    "id": "customer_strengths",
    "label": "Qu’est-ce que les clients apprécient particulièrement et qu’il faut préserver ?"
  },
  {
    "n": "Q18",
    "title": "Priorité terrain",
    "id": "priority_first_action",
    "label": "Parmi les difficultés que vous avez décrites, laquelle faudrait-il traiter en premier dans les trois prochains mois ?"
  }
];
export const surveyFields=[
  {
    "key": "viewport",
    "type": "text",
    "label": "Période de l’intégration observée",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.status",
    "type": "radio",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ?",
    "theme": "Organisation du travail",
    "options": [
      "Des difficultés observées",
      "Aucune difficulté régulière observée",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.1.slot",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Jour et créneau",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "org_workload_peaks.items.1.task",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Poste ou tâche",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "org_workload_peaks.items.1.frequency",
    "type": "select",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Fréquence",
    "theme": "Organisation du travail",
    "options": [
      "Ponctuelle",
      "Chaque semaine",
      "Presque chaque service"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.1.impact",
    "type": "multi",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Des difficultés observéesAucune difficulté régulière observéeJe ne sais pasNon concerné",
    "theme": "Organisation du travail",
    "options": [
      "Attente client",
      "Erreur",
      "Tâche non réalisée",
      "Dépassement horaire",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.1.impact.other",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Précisez « Autre »",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.2.slot",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Jour et créneau",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "org_workload_peaks.items.2.task",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Poste ou tâche",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "org_workload_peaks.items.2.frequency",
    "type": "select",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Fréquence",
    "theme": "Organisation du travail",
    "options": [
      "Ponctuelle",
      "Chaque semaine",
      "Presque chaque service"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.2.impact",
    "type": "multi",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Des difficultés observéesAucune difficulté régulière observéeJe ne sais pasNon concerné",
    "theme": "Organisation du travail",
    "options": [
      "Attente client",
      "Erreur",
      "Tâche non réalisée",
      "Dépassement horaire",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.2.impact.other",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Précisez « Autre »",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.3.slot",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Jour et créneau",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "org_workload_peaks.items.3.task",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Poste ou tâche",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "org_workload_peaks.items.3.frequency",
    "type": "select",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Fréquence",
    "theme": "Organisation du travail",
    "options": [
      "Ponctuelle",
      "Chaque semaine",
      "Presque chaque service"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.3.impact",
    "type": "multi",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Des difficultés observéesAucune difficulté régulière observéeJe ne sais pasNon concerné",
    "theme": "Organisation du travail",
    "options": [
      "Attente client",
      "Erreur",
      "Tâche non réalisée",
      "Dépassement horaire",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_workload_peaks.items.3.impact.other",
    "type": "text",
    "label": "Q01 · À quels moments l’équipe rencontre-t-elle des difficultés pour réaliser le travail demandé ? — Précisez « Autre »",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_available_time.status",
    "type": "radio",
    "label": "Q02 · À quels moments disposez-vous régulièrement de temps qui pourrait être mieux utilisé ?",
    "theme": "Organisation du travail",
    "options": [
      "Des moments identifiés",
      "Aucun moment identifié",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_available_time.slot",
    "type": "text",
    "label": "Q02 · À quels moments disposez-vous régulièrement de temps qui pourrait être mieux utilisé ? — Créneau",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_available_time.roles",
    "type": "text",
    "label": "Q02 · À quels moments disposez-vous régulièrement de temps qui pourrait être mieux utilisé ? — Postes concernés",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_available_time.tasks",
    "type": "text",
    "label": "Q02 · À quels moments disposez-vous régulièrement de temps qui pourrait être mieux utilisé ? — Tâches qui pourraient être réalisées à ce moment-là",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_time_losses.causes",
    "type": "multi",
    "label": "Q03 · Quelles sont les principales causes de perte de temps dans votre travail ?",
    "theme": "Organisation du travail",
    "options": [
      "Attendre une information ou une décision",
      "Chercher du matériel ou des produits",
      "Refaire une tâche après une erreur",
      "Réaliser des déplacements évitables",
      "Effectuer une tâche déjà faite par quelqu’un",
      "Attendre qu’un autre poste termine son travail",
      "Répartir ou clarifier les tâches pendant le service",
      "Autre",
      "Aucune perte de temps importante",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 3,
    "maxLength": 1000
  },
  {
    "key": "org_time_losses.causes.other",
    "type": "text",
    "label": "Q03 · Quelles sont les principales causes de perte de temps dans votre travail ? — Précisez « Autre »",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_time_losses.priority",
    "type": "select",
    "label": "Q03 · Quelles sont les principales causes de perte de temps dans votre travail ? — Quelle cause est prioritaire ?",
    "theme": "Organisation du travail",
    "options": [
      "Attendre une information ou une décision",
      "Chercher du matériel ou des produits",
      "Refaire une tâche après une erreur",
      "Réaliser des déplacements évitables",
      "Effectuer une tâche déjà faite par quelqu’un",
      "Attendre qu’un autre poste termine son travail",
      "Répartir ou clarifier les tâches pendant le service",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_time_losses.example",
    "type": "text",
    "label": "Q03 · Quelles sont les principales causes de perte de temps dans votre travail ? — Donnez un exemple récent et sa fréquence",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_overtime.count",
    "type": "radio",
    "label": "Q04 · Sur les quatre dernières semaines, combien de fois avez-vous dépassé votre horaire de fin prévu ?",
    "theme": "Organisation du travail",
    "options": [
      "Aucune",
      "Une fois",
      "Deux ou trois fois",
      "Quatre fois ou plus",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_overtime.reasons",
    "type": "multi",
    "label": "Q04 · Sur les quatre dernières semaines, combien de fois avez-vous dépassé votre horaire de fin prévu ? — AucuneUne foisDeux ou trois foisQuatre fois ou plusJe ne sais pasNon concerné",
    "theme": "Organisation du travail",
    "options": [
      "Activité client",
      "Rangement ou nettoyage",
      "Préparation du lendemain",
      "Absence ou remplacement",
      "Organisation imprécise",
      "Autre",
      "Je ne sais pas"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_overtime.reasons.other",
    "type": "text",
    "label": "Q04 · Sur les quatre dernières semaines, combien de fois avez-vous dépassé votre horaire de fin prévu ? — Précisez « Autre »",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_improvement.status",
    "type": "radio",
    "label": "Q05 · Quelle modification d’organisation permettrait de mieux absorber l’activité avec les heures de travail disponibles ?",
    "theme": "Organisation du travail",
    "options": [
      "Une proposition",
      "Aucune proposition à ce stade",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_improvement.change",
    "type": "text",
    "label": "Q05 · Quelle modification d’organisation permettrait de mieux absorber l’activité avec les heures de travail disponibles ? — Modification concrète",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "org_improvement.conditions",
    "type": "text",
    "label": "Q05 · Quelle modification d’organisation permettrait de mieux absorber l’activité avec les heures de travail disponibles ? — Conditions nécessaires pour qu’elle fonctionne",
    "theme": "Organisation du travail",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.status",
    "type": "radio",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ?",
    "theme": "Offre commerciale",
    "options": [
      "Des demandes identifiées",
      "Aucune demande identifiée",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.items.1.request",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Ce que le client recherchait",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "offer_unmet_requests.items.1.occasion",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Moment ou occasion",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "offer_unmet_requests.items.1.frequency",
    "type": "select",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Fréquence",
    "theme": "Offre commerciale",
    "options": [
      "Une fois",
      "Plusieurs fois dans le mois",
      "Chaque semaine ou davantage",
      "Je ne sais pas"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.items.1.current_response",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Réponse apportée actuellement",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.items.2.request",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Ce que le client recherchait",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "offer_unmet_requests.items.2.occasion",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Moment ou occasion",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "offer_unmet_requests.items.2.frequency",
    "type": "select",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Fréquence",
    "theme": "Offre commerciale",
    "options": [
      "Une fois",
      "Plusieurs fois dans le mois",
      "Chaque semaine ou davantage",
      "Je ne sais pas"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.items.2.current_response",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Réponse apportée actuellement",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.items.3.request",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Ce que le client recherchait",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "offer_unmet_requests.items.3.occasion",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Moment ou occasion",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "offer_unmet_requests.items.3.frequency",
    "type": "select",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Fréquence",
    "theme": "Offre commerciale",
    "options": [
      "Une fois",
      "Plusieurs fois dans le mois",
      "Chaque semaine ou davantage",
      "Je ne sais pas"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_unmet_requests.items.3.current_response",
    "type": "text",
    "label": "Q06 · Quelles demandes de clients ne parvenons-nous pas à satisfaire aujourd’hui ? — Réponse apportée actuellement",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_lost_opportunities.frequency",
    "type": "radio",
    "label": "Q07 · Avez-vous observé des clients renoncer à une commande, une réservation ou une prestation ?",
    "theme": "Offre commerciale",
    "options": [
      "Jamais",
      "Une fois",
      "Plusieurs fois",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_lost_opportunities.reasons",
    "type": "multi",
    "label": "Q07 · Avez-vous observé des clients renoncer à une commande, une réservation ou une prestation ? — JamaisUne foisPlusieurs foisJe ne sais pasNon concerné",
    "theme": "Offre commerciale",
    "options": [
      "Prix",
      "Offre inadaptée",
      "Manque de disponibilité",
      "Délai de réponse",
      "Conditions peu claires",
      "Autre",
      "Raison inconnue"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_lost_opportunities.reasons.other",
    "type": "text",
    "label": "Q07 · Avez-vous observé des clients renoncer à une commande, une réservation ou une prestation ? — Précisez « Autre »",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_lost_opportunities.example",
    "type": "text",
    "label": "Q07 · Avez-vous observé des clients renoncer à une commande, une réservation ou une prestation ? — Exemple sans information permettant d’identifier le client",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_test_proposal.status",
    "type": "radio",
    "label": "Q08 · À partir des demandes réellement entendues, quelle offre faudrait-il tester en premier ?",
    "theme": "Offre commerciale",
    "options": [
      "Une offre à proposer",
      "Pas assez d’éléments pour proposer une offre",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_test_proposal.customer",
    "type": "text",
    "label": "Q08 · À partir des demandes réellement entendues, quelle offre faudrait-il tester en premier ? — Type de client concerné",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_test_proposal.need",
    "type": "text",
    "label": "Q08 · À partir des demandes réellement entendues, quelle offre faudrait-il tester en premier ? — Besoin ou occasion de visite",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_test_proposal.offer",
    "type": "text",
    "label": "Q08 · À partir des demandes réellement entendues, quelle offre faudrait-il tester en premier ? — Ce que l’offre comprendrait",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_test_proposal.slot",
    "type": "text",
    "label": "Q08 · À partir des demandes réellement entendues, quelle offre faudrait-il tester en premier ? — Jour ou créneau adapté",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_delivery_barriers.barriers",
    "type": "multi",
    "label": "Q09 · Qu’est-ce qui pourrait empêcher l’équipe de réaliser correctement cette nouvelle offre ?",
    "theme": "Offre commerciale",
    "options": [
      "Préparation trop importante",
      "Manque de personnel sur le créneau",
      "Matériel ou espace insuffisant",
      "Compétences à acquérir",
      "Difficulté à prendre ou transmettre les réservations",
      "Organisation entre les postes",
      "Risque de dégrader le service habituel",
      "Autre",
      "Aucun obstacle identifié",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 3,
    "maxLength": 1000
  },
  {
    "key": "offer_delivery_barriers.barriers.other",
    "type": "text",
    "label": "Q09 · Qu’est-ce qui pourrait empêcher l’équipe de réaliser correctement cette nouvelle offre ? — Précisez « Autre »",
    "theme": "Offre commerciale",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_sales_information.rows.1",
    "type": "select",
    "label": "Q10 · Lorsqu’un client vous interroge sur les offres ou prestations de l’établissement, de quoi disposez-vous ? — Une présentation claire de ce qui est proposé",
    "theme": "Offre commerciale",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_sales_information.rows.2",
    "type": "select",
    "label": "Q10 · Lorsqu’un client vous interroge sur les offres ou prestations de l’établissement, de quoi disposez-vous ? — Les prix et les conditions applicables",
    "theme": "Offre commerciale",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_sales_information.rows.3",
    "type": "select",
    "label": "Q10 · Lorsqu’un client vous interroge sur les offres ou prestations de l’établissement, de quoi disposez-vous ? — Les disponibilités ou un moyen de les vérifier",
    "theme": "Offre commerciale",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_sales_information.rows.4",
    "type": "select",
    "label": "Q10 · Lorsqu’un client vous interroge sur les offres ou prestations de l’établissement, de quoi disposez-vous ? — Un interlocuteur identifié pour les demandes particulières",
    "theme": "Offre commerciale",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "offer_sales_information.rows.5",
    "type": "select",
    "label": "Q10 · Lorsqu’un client vous interroge sur les offres ou prestations de l’établissement, de quoi disposez-vous ? — Une méthode pour transmettre la demande et assurer son suivi",
    "theme": "Offre commerciale",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_reference",
    "type": "radio",
    "label": "Période de l’intégration observée",
    "theme": "Intégration",
    "options": [
      "Moins de trois mois",
      "De trois à douze mois",
      "Plus d’un an",
      "Je ne sais plus",
      "Aucune intégration observée"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.1",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Une personne référente identifiée",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.2",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Une présentation des lieux et du matériel",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.3",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Une explication des tâches et des standards attendus",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.4",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Une présentation des produits et de l’offre",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.5",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Une explication des règles essentielles d’hygiène et de sécurité",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.6",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Un temps de pratique accompagné",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_steps.rows.7",
    "type": "select",
    "label": "Q11 · Lors de cette intégration, quels éléments étaient effectivement prévus ? — Un point après les premiers services",
    "theme": "Intégration",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.status",
    "type": "radio",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ?",
    "theme": "Intégration",
    "options": [
      "Des difficultés observées",
      "Aucune difficulté de ce type observée",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.1.task",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Tâche",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "onboarding_difficult_tasks.items.1.impact",
    "type": "multi",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Des difficultés observéesAucune difficulté de ce type observéeJe ne sais pasNon concerné",
    "theme": "Intégration",
    "options": [
      "Erreur",
      "Sollicitation répétée d’un collègue",
      "Retard",
      "Difficulté avec un client",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.1.impact.other",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Précisez « Autre »",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.1.detail",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Précision facultative",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.2.task",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Tâche",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "onboarding_difficult_tasks.items.2.impact",
    "type": "multi",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Des difficultés observéesAucune difficulté de ce type observéeJe ne sais pasNon concerné",
    "theme": "Intégration",
    "options": [
      "Erreur",
      "Sollicitation répétée d’un collègue",
      "Retard",
      "Difficulté avec un client",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.2.impact.other",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Précisez « Autre »",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.2.detail",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Précision facultative",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.3.task",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Tâche",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 300
  },
  {
    "key": "onboarding_difficult_tasks.items.3.impact",
    "type": "multi",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Des difficultés observéesAucune difficulté de ce type observéeJe ne sais pasNon concerné",
    "theme": "Intégration",
    "options": [
      "Erreur",
      "Sollicitation répétée d’un collègue",
      "Retard",
      "Difficulté avec un client",
      "Autre"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.3.impact.other",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Précisez « Autre »",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_difficult_tasks.items.3.detail",
    "type": "text",
    "label": "Q12 · Sur quelles tâches le nouveau collaborateur a-t-il été mis en difficulté faute d’explication ou d’accompagnement ? — Précision facultative",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_autonomy_criteria.criteria",
    "type": "multi",
    "label": "Q13 · Qu’est-ce qui permettait de décider que le nouveau collaborateur pouvait travailler seul sur son poste ?",
    "theme": "Intégration",
    "options": [
      "Une vérification des tâches maîtrisées",
      "Une observation par le référent ou le responsable",
      "L’avis du nouveau collaborateur",
      "Un nombre de jours ou de services fixé à l’avance",
      "Le besoin de le laisser seul pour assurer le service",
      "Aucun critère clairement identifié",
      "Autre",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_autonomy_criteria.criteria.other",
    "type": "text",
    "label": "Q13 · Qu’est-ce qui permettait de décider que le nouveau collaborateur pouvait travailler seul sur son poste ? — Précisez « Autre »",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.supports",
    "type": "multi",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ?",
    "theme": "Intégration",
    "options": [
      "Référent disponible",
      "Fiche de poste ou liste de tâches",
      "Présentation des produits",
      "Démonstration pratique",
      "Service en binôme",
      "Point de suivi",
      "Autre",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 2,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.0",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Référent disponible : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.1",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Fiche de poste ou liste de tâches : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.2",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Présentation des produits : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.3",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Démonstration pratique : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.4",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Service en binôme : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.5",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Point de suivi : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "onboarding_support_priorities.details.6",
    "type": "text",
    "label": "Q14 · Quel accompagnement aurait le plus facilité cette prise de poste ? — Autre : précisez le contenu utile",
    "theme": "Intégration",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.1",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Attente avant l’accueil ou la prise de commande",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.2",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Attente des boissons ou des plats",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.3",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Erreur de commande",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.4",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Produit ou prestation indisponible",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.5",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Qualité ou régularité des produits",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.6",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Qualité de l’accueil ou de l’attention",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.7",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Propreté ou confort",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.8",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Réservation, information ou facturation",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.rows.9",
    "type": "select",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Autre",
    "theme": "Expérience client",
    "options": [
      "Aucun signalement",
      "Une fois",
      "Plusieurs fois, moins d’une fois par semaine",
      "Chaque semaine ou davantage",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_reported_problems.other",
    "type": "text",
    "label": "Q15 · Quels problèmes les clients vous ont-ils signalés sur les quatre dernières semaines ? — Précisez un autre problème (facultatif)",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.status",
    "type": "radio",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ?",
    "theme": "Expérience client",
    "options": [
      "Un problème identifié",
      "Aucun problème identifié",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.facts",
    "type": "text",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ? — Situation récente et faits observés",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.customer_words",
    "type": "text",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ? — Ce que le client a exprimé",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.interpretation",
    "type": "text",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ? — Votre interprétation ou cause probable",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.handling",
    "type": "text",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ? — Manière dont la situation a été traitée",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.response_clarity",
    "type": "select",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ? — Saviez-vous quelle réponse apporter au client ?",
    "theme": "Expérience client",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_main_issue.decision_clarity",
    "type": "select",
    "label": "Q16 · Quel problème dégrade le plus l’expérience client selon vos observations ? — Saviez-vous quelle décision vous pouviez prendre ?",
    "theme": "Expérience client",
    "options": [
      "Oui",
      "Partiellement",
      "Non",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_strengths.status",
    "type": "radio",
    "label": "Q17 · Qu’est-ce que les clients apprécient particulièrement et qu’il faut préserver ?",
    "theme": "Expérience client",
    "options": [
      "Un point fort identifié",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_strengths.observation",
    "type": "text",
    "label": "Q17 · Qu’est-ce que les clients apprécient particulièrement et qu’il faut préserver ? — Retour client ou comportement observé",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "customer_strengths.practice",
    "type": "text",
    "label": "Q17 · Qu’est-ce que les clients apprécient particulièrement et qu’il faut préserver ? — Pratique de l’équipe qui y contribue",
    "theme": "Expérience client",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "priority_first_action.status",
    "type": "radio",
    "label": "Q18 · Parmi les difficultés que vous avez décrites, laquelle faudrait-il traiter en premier dans les trois prochains mois ?",
    "theme": "Première action",
    "options": [
      "Une action à proposer",
      "Aucune proposition à ce stade",
      "Je ne sais pas",
      "Non concerné"
    ],
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "priority_first_action.problem",
    "type": "text",
    "label": "Q18 · Parmi les difficultés que vous avez décrites, laquelle faudrait-il traiter en premier dans les trois prochains mois ? — Le problème précis",
    "theme": "Première action",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "priority_first_action.action",
    "type": "text",
    "label": "Q18 · Parmi les difficultés que vous avez décrites, laquelle faudrait-il traiter en premier dans les trois prochains mois ? — L’action à tester",
    "theme": "Première action",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "priority_first_action.result",
    "type": "text",
    "label": "Q18 · Parmi les difficultés que vous avez décrites, laquelle faudrait-il traiter en premier dans les trois prochains mois ? — Le résultat attendu",
    "theme": "Première action",
    "max": 99,
    "maxLength": 1000
  },
  {
    "key": "priority_first_action.indicator",
    "type": "text",
    "label": "Q18 · Parmi les difficultés que vous avez décrites, laquelle faudrait-il traiter en premier dans les trois prochains mois ? — Le signe concret qui permettrait de vérifier l’amélioration",
    "theme": "Première action",
    "max": 99,
    "maxLength": 1000
  }
];
