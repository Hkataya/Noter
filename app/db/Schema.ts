export const Schemas = {
  course: {
    singular: 'course',
    plural: 'courses',
    relations: {
      sections: {
        hasMany: { type: 'section', options: { queryInverse: 'course' } }
      }
    }
  },
  section: {
    singular: 'section',
    plural: 'sections',
    relations: {
      course: {
        belongsTo: 'course'
      },
      videos: {
        hasMany: { type: 'video', options: { queryInverse: 'section' } }
      }
    }
  },
  video: {
    singular: 'video',
    plural: 'videos',
    relations: {
      section: {
        belongsTo: 'section'
      },
      notes: {
        hasMany: { type: 'note', options: { queryInverse: 'video' } }
      }
    }
  },
  note: {
    singular: 'note',
    plural: 'notes',
    relations: {
      video: {
        belongsTo: 'video'
      }
    }
  }
};

export const Repos = Object.keys(Schemas);

// Note that this function works only for One-to-Many Relations and not Many-to-Many
/*
export function getRelMany(entity: string | number) {
  let RelMany = null;
  const relations = Object.values(Schemas[entity].relations);
  for (let i = 0; i < relations.length; i += 1) {
    if (relations[i].hasMany) {
      RelMany = relations[i].hasMany.type;
      break;
    }
  }
  return RelMany;
}
*/
