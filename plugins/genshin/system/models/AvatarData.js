import lodash from 'lodash'
import Base from './Base.js'
import moment from 'moment'
import { Character, AvatarArtis, ProfileData, Weapon } from './index.js'
import { Data, Format } from '#yunzai'
import AttrCalc from './profile/AttrCalc.js'
import Profile from './player/Profile.js'

const charKey = 'name,abbr,sName,star,imgs,face,side,gacha,weaponTypeName'.split(',')

export default class AvatarData extends Base {
  constructor (ds = {}, game = 'gs') {
    super()
    let char = Character.get({ id: ds.id, elem: ds.elem })
    if (!char) {
      return
    }
    this.id = char.id
    this.char = char
    this.game = char.game || game
    this.initArtis()
    this.setAvatar(ds)
  }

  get hasTalent () {
    return this.talent && !lodash.isEmpty(this.talent) && !!this._talent
  }

  get name () {
    return this.char?.name || ''
  }

  get hasData () {
    return !!(this.level > 1 || this?.weapon?.name || this?.talent?.a)
  }

  // 是否是合法面板数据
  get isProfile () {
    return Profile.isProfile(this)
  }

  get costume () {
    let costume = this._costume
    if (lodash.isArray(costume)) {
      costume = costume[0]
    }
    return costume
  }

  get originalTalent () {
    return lodash.mapValues(this.talent, (ds) => ds.original)
  }

  /**
   * 获取圣遗物套装属性
   * @returns {boolean|*|{imgs: *[], names: *[], sets: {}, abbrs: *[], sName: string, name: (string|*)}|{}}
   */
  get artisSet () {
    return this.artis.getSetData()
  }

  get dataSource () {
    return {
      enka: 'Enka.Network',
      miao: '喵喵Api',
      mgg: 'MiniGG-Api',
      hutao: 'Hutao-Enka',
      mys: '米游社',
      homo: 'Mihomo'
    }[this._source] || this._source
  }

  get updateTime () {
    let time = this._time
    if (!time) {
      return ''
    }
    if (lodash.isString(time)) {
      return moment(time).format('MM-DD HH:mm')
    }
    if (lodash.isNumber(time)) {
      return moment(new Date(time)).format('MM-DD HH:mm')
    }
    return ''
  }

  static create (ds, game = 'gs') {
    let avatar = new AvatarData(ds, game)
    if (!avatar) {
      return false
    }
    return avatar
  }

  initArtis () {
    this.artis = new AvatarArtis(this.id, this.game)
  }

  _get (key) {
    if (charKey.includes(key)) {
      return this.char[key]
    }
  }

  setAvatar (ds, source = '') {
    this._now = new Date() * 1
    this.setBasic(ds, source)
    ds.weapon && this.setWeapon(ds.weapon)
    ds.talent && this.setTalent(ds.talent, 'original', source)
    ds.artis && this.setArtis(ds)
    delete this._now
  }

  /**
   * 设置角色基础数据
   * @param ds
   * @param source
   */
  setBasic (ds = {}, source = '') {
    const now = this._now || (new Date()) * 1
    this.level = ds.lv || ds.level || this.level || 1
    this.cons = ds.cons || this.cons || 0
    this.fetter = ds.fetter || this.fetter || 0
    this._costume = ds.costume || this._costume || 0
    this.elem = ds.elem || this.elem || this.char.elem || ''
    this.promote = lodash.isUndefined(ds.promote) ? (this.promote || AttrCalc.calcPromote(this.level)) : (ds.promote || 0)
    this.trees = ds.trees || this.trees || []
    this._source = ds._source || this._source || ''
    this._time = ds._time || this._time || now
    this._update = ds._update || this._update || ds._time || now
    this._talent = ds._talent || this._talent || ds._time || now

    // 存在数据源时更新时间
    if (source) {
      this._update = now
      if (source !== 'mys') {
        this._source = source
        this._time = now
      } else {
        this._source = this._source || source
        this._time = this._source !== 'mys' ? (this._time || now) : now
      }
    }
  }

  setWeapon (ds = {}) {
    let w = Weapon.get(ds.name || ds.id, this.game)
    if (!w) {
      return false
    }
    this.weapon = {
      id: ds.id || w.id,
      name: ds.name || w.name,
      level: ds.level || ds.lv || 1,
      promote: lodash.isUndefined(ds.promote) ? AttrCalc.calcPromote(ds.level || ds.lv || 1) : (ds.promote || 0),
      affix: ds.affix,
      ...w.getData('star,abbr,type,img')
    }
    if (this.weapon.level < 20) {
      this.weapon.promote = 0
    }
  }

  getWeaponDetail () {
    if (this.isGs) {
      return this.weapon
    }
    let ret = {
      ...this.weapon
    }
    if (!ret.id) {
      return {}
    }
    let wData = Weapon.get(ret.id, this.game)
    ret.splash = wData.imgs.gacha
    let attrs = wData.calcAttr(ret.level, ret.promote)
    lodash.forEach(attrs, (val, key) => {
      attrs[key] = Format.comma(val, 1)
    })
    ret.attrs = attrs
    ret.desc = wData.getAffixDesc(ret.affix)
    return ret
  }

  setTalent (ds = false, mode = 'original', updateTime = '') {
    const now = this._now || (new Date()) * 1
    if (ds) {
      let ret = this.char.getAvatarTalent(ds, this.cons, mode)
      if (ret) {
        this.talent = ret || this.talent
        // 设置天赋更新时间
        this._talent = ds._talent || this._talent || ds._time || now
      }
    }
    if (updateTime) {
      this._talent = now
    }
  }

  setArtis (ds, source) {
    this.artis.setArtisData(ds.artis, source)
  }

  getProfile () {
    if (!this.isProfile) {
      return false
    }
    return ProfileData.create(this, this.game)
  }

  // 判断当前profileData是否具备有效圣遗物信息
  hasArtis () {
    return this.isProfile && this.artis.length > 0
  }

  // toJSON 供保存使用
  toJSON () {
    let keys = this.isGs ?
      'name,id,elem,level,promote,fetter,costume,cons,talent:originalTalent' :
      'name,id,elem,level,promote,cons,talent:originalTalent,trees'
    return {
      ...this.getData(keys),
      weapon: Data.getData(this.weapon, this.isGs ? 'name,level,promote,affix' : 'id,level,promote,affix'),
      ...this.getData('artis,_source,_time,_update,_talent')
    }
  }

  getDetail (keys = '') {
    let imgs = this.char.getImgs(this.costume)
    if (this.isGs) {
      return {
        ...(this.getData(keys || 'id,name,level,star,cons,fetter,elem,abbr,weapon,talent,artisSet') || {}),
        ...Data.getData(imgs, 'face,qFace,side,gacha')
      }
    } else {
      return {
        ...(this.getData(keys || 'id,name,level,star,cons,elem,abbr,weapon,talent,artisSet,trees') || {}),
        ...Data.getData(imgs, 'face,qFace,gacha,preview')
      }
    }
  }

  getArtisDetail () {
    return this.artis.getDetail()
  }
}
