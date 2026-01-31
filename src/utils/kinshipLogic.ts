interface KinshipRelation {
  gender: string;
  relation: string;
  reverse: string[];
  generation: number;
  type: string;
  branch: string;
  parents?: string[];
  spouse?: string;
  children?: string[];
  synonyms?: string[];
}

export class KinshipLogic {
  private static readonly GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    UNKNOWN: 'unknown'
  } as const;

  private static readonly GENERATION = {
    SELF: 0,
    PARENT: 1,
    GRANDPARENT: 2,
    GREAT_GRANDPARENT: 3,
    CHILD: -1,
    GRANDCHILD: -2,
    GREAT_GRANDCHILD: -3
  } as const;

  private static readonly RELATION_TYPE = {
    DIRECT: 'direct',
    COLLATERAL: 'collateral',
    SPOUSE: 'spouse',
    IN_LAW: 'in_law'
  } as const;

  private readonly relationMap: Map<string, KinshipRelation> = new Map();
  private readonly relationPathMap: Map<string, string[]> = new Map();

  constructor() {
    this.initializeRelationMap();
    this.initializeRelationPaths();
  }

  private initializeRelationMap(): void {
    this.addRelation('曾祖父', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'great-grandfather',
      reverse: ['曾孙', '曾孙女'],
      generation: KinshipLogic.GENERATION.GREAT_GRANDPARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'paternal',
      parents: ['高祖父', '高祖母']
    });

    this.addRelation('曾祖母', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'great-grandmother',
      reverse: ['曾孙', '曾孙女'],
      generation: KinshipLogic.GENERATION.GREAT_GRANDPARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'paternal',
      parents: ['高祖父', '高祖母']
    });

    this.addRelation('爷爷', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'grandfather',
      reverse: ['孙子', '孙女'],
      generation: KinshipLogic.GENERATION.GRANDPARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'paternal',
      parents: ['曾祖父', '曾祖母'],
      spouse: '奶奶'
    });

    this.addRelation('奶奶', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'grandmother',
      reverse: ['孙子', '孙女'],
      generation: KinshipLogic.GENERATION.GRANDPARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'paternal',
      parents: ['外曾祖父', '外曾祖母'],
      spouse: '爷爷'
    });

    this.addRelation('外公', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'grandfather',
      reverse: ['外孙', '外孙女'],
      generation: KinshipLogic.GENERATION.GRANDPARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'maternal',
      parents: ['外曾祖父', '外曾祖母'],
      spouse: '外婆',
      synonyms: ['姥爷']
    });

    this.addRelation('外婆', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'grandmother',
      reverse: ['外孙', '外孙女'],
      generation: KinshipLogic.GENERATION.GRANDPARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'maternal',
      parents: ['外曾祖父', '外曾祖母'],
      spouse: '外公',
      synonyms: ['姥姥']
    });

    this.addRelation('爸爸', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'father',
      reverse: ['儿子', '女儿'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'paternal',
      parents: ['爷爷', '奶奶'],
      spouse: '妈妈',
      synonyms: ['父亲', '爸']
    });

    this.addRelation('妈妈', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'mother',
      reverse: ['儿子', '女儿'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'maternal',
      parents: ['外公', '外婆'],
      spouse: '爸爸',
      synonyms: ['母亲', '妈']
    });

    this.addRelation('自己', {
      gender: KinshipLogic.GENDER.UNKNOWN,
      relation: 'self',
      reverse: [],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'self'
    });

    this.addRelation('丈夫', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'husband',
      reverse: ['妻子'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.SPOUSE,
      branch: 'spouse',
      spouse: '妻子',
      synonyms: ['老公', '夫']
    });

    this.addRelation('妻子', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'wife',
      reverse: ['丈夫'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.SPOUSE,
      branch: 'spouse',
      spouse: '丈夫',
      synonyms: ['老婆', '妻']
    });

    this.addRelation('儿子', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'son',
      reverse: ['爸爸', '妈妈'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'self',
      parents: ['自己', '配偶']
    });

    this.addRelation('女儿', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'daughter',
      reverse: ['爸爸', '妈妈'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'self',
      parents: ['自己', '配偶']
    });

    this.addRelation('孙子', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'grandson',
      reverse: ['爷爷', '奶奶'],
      generation: KinshipLogic.GENERATION.GRANDCHILD,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'self'
    });

    this.addRelation('孙女', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'granddaughter',
      reverse: ['爷爷', '奶奶'],
      generation: KinshipLogic.GENERATION.GRANDCHILD,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'self'
    });

    this.addRelation('外孙', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'grandson',
      reverse: ['外公', '外婆'],
      generation: KinshipLogic.GENERATION.GRANDCHILD,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'maternal'
    });

    this.addRelation('外孙女', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'granddaughter',
      reverse: ['外公', '外婆'],
      generation: KinshipLogic.GENERATION.GRANDCHILD,
      type: KinshipLogic.RELATION_TYPE.DIRECT,
      branch: 'maternal'
    });

    this.addRelation('哥哥', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'older-brother',
      reverse: ['弟弟', '妹妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['爸爸', '妈妈'],
      synonyms: ['兄', '兄长']
    });

    this.addRelation('弟弟', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'younger-brother',
      reverse: ['哥哥', '姐姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['爸爸', '妈妈'],
      synonyms: ['弟']
    });

    this.addRelation('姐姐', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'older-sister',
      reverse: ['弟弟', '妹妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['爸爸', '妈妈'],
      synonyms: ['姊', '姐']
    });

    this.addRelation('妹妹', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'younger-sister',
      reverse: ['哥哥', '姐姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['爸爸', '妈妈'],
      synonyms: ['妹']
    });

    this.addRelation('伯伯', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'paternal-uncle-older',
      reverse: ['侄子', '侄女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['爷爷', '奶奶'],
      spouse: '伯母',
      synonyms: ['伯父']
    });

    this.addRelation('伯母', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'paternal-aunt-by-marriage-older',
      reverse: ['侄子', '侄女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'paternal',
      spouse: '伯伯'
    });

    this.addRelation('叔叔', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'paternal-uncle-younger',
      reverse: ['侄子', '侄女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['爷爷', '奶奶'],
      spouse: '婶婶',
      synonyms: ['叔父']
    });

    this.addRelation('婶婶', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'paternal-aunt-by-marriage-younger',
      reverse: ['侄子', '侄女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'paternal',
      spouse: '叔叔',
      synonyms: ['婶娘']
    });

    this.addRelation('姑姑', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'paternal-aunt',
      reverse: ['侄子', '侄女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['爷爷', '奶奶'],
      spouse: '姑父',
      synonyms: ['姑妈', '姑母']
    });

    this.addRelation('姑父', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'paternal-uncle-by-marriage',
      reverse: ['侄子', '侄女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'paternal',
      spouse: '姑姑'
    });

    this.addRelation('舅舅', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'maternal-uncle',
      reverse: ['外甥', '外甥女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'maternal',
      parents: ['外公', '外婆'],
      spouse: '舅妈',
      synonyms: ['舅父']
    });

    this.addRelation('舅妈', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'maternal-aunt-by-marriage',
      reverse: ['外甥', '外甥女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'maternal',
      spouse: '舅舅',
      synonyms: ['舅母']
    });

    this.addRelation('姨妈', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'maternal-aunt',
      reverse: ['外甥', '外甥女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'maternal',
      parents: ['外公', '外婆'],
      spouse: '姨父',
      synonyms: ['姨母', '阿姨']
    });

    this.addRelation('姨父', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'maternal-uncle-by-marriage',
      reverse: ['外甥', '外甥女'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'maternal',
      spouse: '姨妈'
    });

    this.addRelation('堂哥', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'paternal-cousin-older-male',
      reverse: ['堂弟', '堂妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['伯伯', '叔叔']
    });

    this.addRelation('堂弟', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'paternal-cousin-younger-male',
      reverse: ['堂哥', '堂姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['伯伯', '叔叔']
    });

    this.addRelation('堂姐', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'paternal-cousin-older-female',
      reverse: ['堂弟', '堂妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['伯伯', '叔叔']
    });

    this.addRelation('堂妹', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'paternal-cousin-younger-female',
      reverse: ['堂哥', '堂姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal',
      parents: ['伯伯', '叔叔']
    });

    this.addRelation('表哥', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'cousin-older-male',
      reverse: ['表弟', '表妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['姑姑', '舅舅', '姨妈']
    });

    this.addRelation('表弟', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'cousin-younger-male',
      reverse: ['表哥', '表姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['姑姑', '舅舅', '姨妈']
    });

    this.addRelation('表姐', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'cousin-older-female',
      reverse: ['表弟', '表妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['姑姑', '舅舅', '姨妈']
    });

    this.addRelation('表妹', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'cousin-younger-female',
      reverse: ['表哥', '表姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'both',
      parents: ['姑姑', '舅舅', '姨妈']
    });

    this.addRelation('侄子', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'nephew',
      reverse: ['伯伯', '叔叔', '姑姑'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal'
    });

    this.addRelation('侄女', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'niece',
      reverse: ['伯伯', '叔叔', '姑姑'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'paternal'
    });

    this.addRelation('外甥', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'nephew',
      reverse: ['舅舅', '姨妈'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'maternal'
    });

    this.addRelation('外甥女', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'niece',
      reverse: ['舅舅', '姨妈'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.COLLATERAL,
      branch: 'maternal'
    });

    this.addRelation('岳父', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'father-in-law',
      reverse: ['女婿'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law',
      spouse: '岳母',
      synonyms: ['丈人']
    });

    this.addRelation('岳母', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'mother-in-law',
      reverse: ['女婿'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law',
      spouse: '岳父',
      synonyms: ['丈母娘']
    });

    this.addRelation('公公', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'father-in-law',
      reverse: ['儿媳'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law',
      spouse: '婆婆',
      synonyms: ['公爹']
    });

    this.addRelation('婆婆', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'mother-in-law',
      reverse: ['儿媳'],
      generation: KinshipLogic.GENERATION.PARENT,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law',
      spouse: '公公',
      synonyms: ['婆母']
    });

    this.addRelation('女婿', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'son-in-law',
      reverse: ['岳父', '岳母', '公公', '婆婆'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });

    this.addRelation('儿媳', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'daughter-in-law',
      reverse: ['公公', '婆婆'],
      generation: KinshipLogic.GENERATION.CHILD,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law',
      synonyms: ['媳妇']
    });

    this.addRelation('嫂子', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'sister-in-law-older',
      reverse: ['弟弟', '妹妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'both',
      spouse: '哥哥'
    });

    this.addRelation('弟媳', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'sister-in-law-younger',
      reverse: ['哥哥', '姐姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'both',
      spouse: '弟弟',
      synonyms: ['弟妹']
    });

    this.addRelation('姐夫', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'brother-in-law-older',
      reverse: ['弟弟', '妹妹'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'both',
      spouse: '姐姐'
    });

    this.addRelation('妹夫', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'brother-in-law-younger',
      reverse: ['哥哥', '姐姐'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'both',
      spouse: '妹妹'
    });

    this.addRelation('大伯子', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'brother-in-law-husband-side-older',
      reverse: ['弟媳'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });

    this.addRelation('小叔子', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'brother-in-law-husband-side-younger',
      reverse: ['嫂子'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });

    this.addRelation('大姑子', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'sister-in-law-husband-side-older',
      reverse: ['弟媳'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });

    this.addRelation('小姑子', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'sister-in-law-husband-side-younger',
      reverse: ['嫂子'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });

    this.addRelation('连襟', {
      gender: KinshipLogic.GENDER.MALE,
      relation: 'brother-in-law',
      reverse: ['连襟'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });

    this.addRelation('妯娌', {
      gender: KinshipLogic.GENDER.FEMALE,
      relation: 'sister-in-law',
      reverse: ['妯娌'],
      generation: KinshipLogic.GENERATION.SELF,
      type: KinshipLogic.RELATION_TYPE.IN_LAW,
      branch: 'in_law'
    });
  }

  private addRelation(key: string, relation: KinshipRelation): void {
    this.relationMap.set(key, relation);

    if (relation.synonyms) {
      for (const synonym of relation.synonyms) {
        this.relationMap.set(synonym, relation);
      }
    }
  }

  private initializeRelationPaths(): void {
    this.relationPathMap.set('爸爸的爸爸', ['爷爷']);
    this.relationPathMap.set('爸爸的妈妈', ['奶奶']);
    this.relationPathMap.set('妈妈的爸爸', ['外公', '姥爷']);
    this.relationPathMap.set('妈妈的妈妈', ['外婆', '姥姥']);

    this.relationPathMap.set('爸爸的哥哥', ['伯伯', '伯父']);
    this.relationPathMap.set('爸爸的弟弟', ['叔叔', '叔父']);
    this.relationPathMap.set('爸爸的姐妹', ['姑姑', '姑妈', '姑母']);
    this.relationPathMap.set('妈妈的兄弟', ['舅舅', '舅父']);
    this.relationPathMap.set('妈妈的姐妹', ['姨妈', '姨母', '阿姨']);

    this.relationPathMap.set('爷爷的兄弟', ['伯祖父', '叔祖父']);
    this.relationPathMap.set('爷爷的姐妹', ['姑祖母']);
    this.relationPathMap.set('奶奶的兄弟', ['舅公']);
    this.relationPathMap.set('奶奶的姐妹', ['姨婆']);

    this.relationPathMap.set('外公的兄弟', ['外伯祖父', '外叔祖父']);
    this.relationPathMap.set('外公的姐妹', ['外姑祖母']);
    this.relationPathMap.set('外婆的兄弟', ['外舅公']);
    this.relationPathMap.set('外婆的姐妹', ['外姨婆']);

    this.relationPathMap.set('伯伯的儿子', ['堂哥', '堂弟']);
    this.relationPathMap.set('伯伯的女儿', ['堂姐', '堂妹']);
    this.relationPathMap.set('叔叔的儿子', ['堂哥', '堂弟']);
    this.relationPathMap.set('叔叔的女儿', ['堂姐', '堂妹']);
    this.relationPathMap.set('姑姑的儿子', ['表哥', '表弟']);
    this.relationPathMap.set('姑姑的女儿', ['表姐', '表妹']);
    this.relationPathMap.set('舅舅的儿子', ['表哥', '表弟']);
    this.relationPathMap.set('舅舅的女儿', ['表姐', '表妹']);
    this.relationPathMap.set('姨妈的儿子', ['表哥', '表弟']);
    this.relationPathMap.set('姨妈的女儿', ['表姐', '表妹']);

    this.relationPathMap.set('哥哥的儿子', ['侄子']);
    this.relationPathMap.set('哥哥的女儿', ['侄女']);
    this.relationPathMap.set('弟弟的儿子', ['侄子']);
    this.relationPathMap.set('弟弟的女儿', ['侄女']);
    this.relationPathMap.set('姐姐的儿子', ['外甥']);
    this.relationPathMap.set('姐姐的女儿', ['外甥女']);
    this.relationPathMap.set('妹妹的儿子', ['外甥']);
    this.relationPathMap.set('妹妹的女儿', ['外甥女']);
  }

  private cleanChain(chain: string[]): string[] {
    return chain.filter(word => !['的', '与', '和', '或', '又', '且'].includes(word));
  }

  private normalizeRelation(word: string): string {
    const map: Record<string, string> = {
      '爹':'爸爸','娘':'妈妈','爸':'爸爸','妈':'妈妈','爷':'爷爷','奶':'奶奶',
      '姥':'外婆','姥爷':'外公','姥姥':'外婆','兄':'哥哥','弟':'弟弟','姐':'姐姐',
      '妹':'妹妹','夫':'丈夫','妻':'妻子','媳':'儿媳','婿':'女婿','孙':'孙子',
      '孙女':'孙女','外孙':'外孙','外孙女':'外孙女','侄':'侄子','甥':'外甥',
      '岳丈':'岳父','丈母':'岳母','公爹':'公公','婆母':'婆婆','舅':'舅舅','姨':'姨妈',
      '姑':'姑姑','叔':'叔叔','伯':'伯伯','婶':'婶婶','舅妈':'舅妈','姨父':'姨父',
      '姑父':'姑父','伯母':'伯母','父亲':'爸爸','母亲':'妈妈','祖父':'爷爷',
      '祖母':'奶奶','外祖父':'外公','外祖母':'外婆'
    };
    return map[word] || word;
  }

  private calculateChain(chain: string[]): string | null {
    if (chain.length === 0) return '自己';
    const normalized = chain.map(w => this.normalizeRelation(w));
    const directMatch = normalized.join('');
    if (this.relationMap.has(directMatch)) return directMatch;
    const pathKey = normalized.join('的');
    if (this.relationPathMap.has(pathKey)) return this.relationPathMap.get(pathKey)![0];
    let current = '自己';
    for (const rel of normalized) {
      const next = this.calculateSingleStep(current, rel);
      if (!next) return null;
      current = next;
    }
    return current;
  }

  private calculateSingleStep(from: string, step: string): string | null {
    const fromInfo = this.relationMap.get(from);
    if (!fromInfo) return null;
    if (from === '自己') return this.relationMap.has(step) ? step : null;

    switch (fromInfo.relation) {
      case 'father': return this.calcFromFather(step);
      case 'mother': return this.calcFromMother(step);
      case 'grandfather': return fromInfo.branch === 'paternal'
        ? this.calcFromPaternalGrandfather(step)
        : this.calcFromMaternalGrandfather(step);
      case 'grandmother': return fromInfo.branch === 'paternal'
        ? this.calcFromPaternalGrandmother(step)
        : this.calcFromMaternalGrandmother(step);
      case 'older-brother': case 'younger-brother':
        return this.calcFromBrother(from, step);
      case 'older-sister': case 'younger-sister':
        return this.calcFromSister(from, step);
      case 'paternal-uncle-older': case 'paternal-uncle-younger':
        return this.calcFromPaternalUncle(from, step);
      case 'paternal-aunt': return this.calcFromPaternalAunt(step);
      case 'maternal-uncle': return this.calcFromMaternalUncle(step);
      case 'maternal-aunt': return this.calcFromMaternalAunt(step);
      default: return null;
    }
  }

  private calcFromFather(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'father': return '爷爷';
      case 'mother': return '奶奶';
      case 'older-brother': return '伯伯';
      case 'younger-brother': return '叔叔';
      case 'older-sister': case 'younger-sister': return '姑姑';
      case 'son': return '哥哥或弟弟';
      case 'daughter': return '姐姐或妹妹';
      case 'wife': return '妈妈';
      default: return null;
    }
  }

  private calcFromMother(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'father': return '外公';
      case 'mother': return '外婆';
      case 'older-brother': case 'younger-brother': return '舅舅';
      case 'older-sister': case 'younger-sister': return '姨妈';
      case 'son': return '哥哥或弟弟';
      case 'daughter': return '姐姐或妹妹';
      case 'husband': return '爸爸';
      default: return null;
    }
  }

  private calcFromPaternalGrandfather(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'older-brother': return '伯祖父';
      case 'younger-brother': return '叔祖父';
      case 'older-sister': case 'younger-sister': return '姑祖母';
      case 'son': return '爸爸或叔叔或伯伯';
      case 'daughter': return '姑姑';
      case 'wife': return '奶奶';
      default: return null;
    }
  }

  private calcFromPaternalGrandmother(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'older-brother': case 'younger-brother': return '舅公';
      case 'older-sister': case 'younger-sister': return '姨婆';
      case 'son': return '爸爸或叔叔或伯伯';
      case 'daughter': return '姑姑';
      case 'husband': return '爷爷';
      default: return null;
    }
  }

  private calcFromMaternalGrandfather(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'older-brother': return '外伯祖父';
      case 'younger-brother': return '外叔祖父';
      case 'older-sister': case 'younger-sister': return '外姑祖母';
      case 'son': return '舅舅';
      case 'daughter': return '姨妈';
      case 'wife': return '外婆';
      default: return null;
    }
  }

  private calcFromMaternalGrandmother(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'older-brother': case 'younger-brother': return '外舅公';
      case 'older-sister': case 'younger-sister': return '外姨婆';
      case 'son': return '舅舅';
      case 'daughter': return '姨妈';
      case 'husband': return '外公';
      default: return null;
    }
  }

  private calcFromBrother(from: string, step: string): string | null {
    const fromInfo = this.relationMap.get(from)!;
    const info = this.relationMap.get(step);
    if (!info) return null;
    const isOlder = fromInfo.relation === 'older-brother';
    switch (info.relation) {
      case 'son': return '侄子';
      case 'daughter': return '侄女';
      case 'wife': return isOlder ? '嫂子' : '弟媳';
      case 'father': return '爸爸';
      case 'mother': return '妈妈';
      default: return null;
    }
  }

  private calcFromSister(from: string, step: string): string | null {
    const fromInfo = this.relationMap.get(from)!;
    const info = this.relationMap.get(step);
    if (!info) return null;
    const isOlder = fromInfo.relation === 'older-sister';
    switch (info.relation) {
      case 'son': return '外甥';
      case 'daughter': return '外甥女';
      case 'husband': return isOlder ? '姐夫' : '妹夫';
      case 'father': return '爸爸';
      case 'mother': return '妈妈';
      default: return null;
    }
  }

  private calcFromPaternalUncle(from: string, step: string): string | null {
    const fromInfo = this.relationMap.get(from)!;
    const info = this.relationMap.get(step);
    if (!info) return null;
    const isOlder = fromInfo.relation === 'paternal-uncle-older';
    switch (info.relation) {
      case 'son': return '堂哥或堂弟';
      case 'daughter': return '堂姐或堂妹';
      case 'wife': return isOlder ? '伯母' : '婶婶';
      case 'father': return '爷爷';
      case 'mother': return '奶奶';
      default: return null;
    }
  }

  private calcFromPaternalAunt(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'son': return '表哥或表弟';
      case 'daughter': return '表姐或表妹';
      case 'husband': return '姑父';
      case 'father': return '爷爷';
      case 'mother': return '奶奶';
      default: return null;
    }
  }

  private calcFromMaternalUncle(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'son': return '表哥或表弟';
      case 'daughter': return '表姐或表妹';
      case 'wife': return '舅妈';
      case 'father': return '外公';
      case 'mother': return '外婆';
      default: return null;
    }
  }

  private calcFromMaternalAunt(step: string): string | null {
    const info = this.relationMap.get(step);
    if (!info) return null;
    switch (info.relation) {
      case 'son': return '表哥或表弟';
      case 'daughter': return '表姐或表妹';
      case 'husband': return '姨父';
      case 'father': return '外公';
      case 'mother': return '外婆';
      default: return null;
    }
  }

  private findRelationByEnglish(englishRel: string): string | null {
    for (const [key, info] of this.relationMap.entries()) {
      if (info.relation === englishRel) return key;
    }
    return null;
  }

  public getRelationship(chain: string[]): string {
    try {
      const cleaned = this.cleanChain(chain);
      const result = this.calculateChain(cleaned);
      if (result) return result.includes('或') ? result.split('或')[0] : result;
      return '未知关系';
    } catch {
      return '计算错误';
    }
  }

  public reverseQuery(title: string): string[][] {
    const normalized = this.normalizeRelation(title);
    const info = this.relationMap.get(normalized);
    if (!info) return [];
    const results: string[][] = [];

    switch (info.relation) {
      case 'grandmother':
        results.push(info.branch === 'paternal' ? ['爸爸','妈妈'] : ['妈妈','妈妈']);
        break;
      case 'grandfather':
        results.push(info.branch === 'paternal' ? ['爸爸','爸爸'] : ['妈妈','爸爸']);
        break;
      case 'paternal-uncle-older': results.push(['爸爸','哥哥']); break;
      case 'paternal-uncle-younger': results.push(['爸爸','弟弟']); break;
      case 'paternal-aunt': results.push(['爸爸','姐妹']); break;
      case 'maternal-uncle': results.push(['妈妈','兄弟']); break;
      case 'maternal-aunt': results.push(['妈妈','姐妹']); break;
      case 'paternal-cousin-older-male': case 'paternal-cousin-younger-male':
        results.push(['爸爸','兄弟','儿子']); break;
      case 'paternal-cousin-older-female': case 'paternal-cousin-younger-female':
        results.push(['爸爸','兄弟','女儿']); break;
      case 'cousin-older-male': case 'cousin-younger-male':
        results.push(['爸爸','姐妹','儿子'],['妈妈','兄弟','儿子'],['妈妈','姐妹','儿子']);
        break;
      case 'cousin-older-female': case 'cousin-younger-female':
        results.push(['爸爸','姐妹','女儿'],['妈妈','兄弟','女儿'],['妈妈','姐妹','女儿']);
        break;
      default:
        for (const rel of info.reverse) {
          const reverseInfo = this.findRelationByEnglish(rel);
          if (reverseInfo) results.push([reverseInfo]);
        }
    }
    return results;
  }

  public getRelationInfo(title: string): KinshipRelation | null {
    return this.relationMap.get(this.normalizeRelation(title)) || null;
  }

  public isReciprocal(title1: string, title2: string): boolean {
    const info1 = this.getRelationInfo(title1);
    const info2 = this.getRelationInfo(title2);
    if (!info1 || !info2) return false;
    const title2Norm = this.normalizeRelation(title2);
    return info1.reverse.some(rel => {
      const reverseInfo = this.findRelationByEnglish(rel);
      return reverseInfo === title2Norm || info2.relation === rel;
    });
  }

  public getAllRelations(): string[] {
    const unique = new Set<string>();
    const seen = new Set<string>();
    for (const [key, info] of this.relationMap.entries()) {
      if (!seen.has(info.relation)) {
        unique.add(key);
        seen.add(info.relation);
      }
    }
    return Array.from(unique);
  }

  public getRelationsByGeneration(gen: number): string[] {
    const results: string[] = [];
    for (const [key, info] of this.relationMap.entries()) {
      if (info.generation === gen) results.push(key);
    }
    return results;
  }

  public getRelationsByType(type: string): string[] {
    const results: string[] = [];
    for (const [key, info] of this.relationMap.entries()) {
      if (info.type === type) results.push(key);
    }
    return results;
  }

  public simplifyChain(chain: string[]): string[] {
    const cleaned = this.cleanChain(chain);
    const normalized = cleaned.map(w => this.normalizeRelation(w));

    if (normalized.length >= 2) {
      const lastTwo = normalized.slice(-2).join('');
      if (this.relationMap.has(lastTwo)) return [lastTwo];

      if (normalized.length >= 4) {
        const p1 = normalized.slice(0, 2).join('');
        const p2 = normalized.slice(2, 4).join('');
        if ((p1 === '爸爸' || p1 === '妈妈') && (p2 === '爸爸' || p2 === '妈妈')) {
          if (p1 === '爸爸' && p2 === '爸爸') return ['爷爷'];
          if (p1 === '爸爸' && p2 === '妈妈') return ['奶奶'];
          if (p1 === '妈妈' && p2 === '爸爸') return ['外公'];
          if (p1 === '妈妈' && p2 === '妈妈') return ['外婆'];
        }
      }
    }
    return normalized;
  }
}
