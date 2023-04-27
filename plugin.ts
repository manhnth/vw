type View = 'exterior' | 'interior';
type Behavior = 'animation' | 'design';
type ExterDesign = 'color' | 'wheels' | 'BG Colors' | 'none';
type InterDesign = 'color' | 'BG Colors' | 'none';
type Seat = 'Driver Seat' | 'Co-Driver Seat' | 'Back Seat L' | 'Back Seat R';

export class VWPlugin {
  private basePlugin: BasicPlugin = null;
  private onUpdate: () => void;

  public initialize(basePlugin: BasicPlugin, onUpdate: () => {}) {
    this.basePlugin = basePlugin;
    this.onUpdate = onUpdate;
  }

  private _view: View;
  private _actionGroup: Behavior;
  private _activeExterDesign: ExterDesign;
  private _activeInterDesign: InterDesign;
  private _seat: Seat;
  private _light: boolean;
  private _currentScene: string;
  private _materials: any;
  private _models: any;

  constructor() {
    this._view = 'exterior';
    this._actionGroup = 'design';
    this._light = false;
    this._activeExterDesign = 'none';
    this._activeInterDesign = 'none';
    this._seat = 'Driver Seat';
    this._currentScene = CARLIST[0].scene;
    this._materials = null;
    this._models = null;
  }

  refreshOnNewScene() {
    this._view = 'exterior';
    this._actionGroup = 'design';
    this._light = false;
    this._activeExterDesign = 'none';
    this._activeInterDesign = 'none';
    this._seat = 'Driver Seat';
  }

  //expose
  private _carpaint: SelectionObject<{
    id: string;
    name: string;
    img: Image;
  }>;
  public get carpaint(): SelectionObject<{
    id: string;
    name: string;
    img: Image;
  }> {
    return this._materials?.find((m) => m.groupName === 'Select your Color')
      .options;
  }

  //expose
  private _background: SelectionObject<{
    id: string;
    name: string;
    img: Image;
  }>;
  public get background(): SelectionObject<{
    id: string;
    name: string;
    img: Image;
  }> {
    return this._materials?.find((m) => m.groupName === 'BG Colors').options;
  }

  //expose
  private _interColor: SelectionObject<{
    id: string;
    name: string;
    img: Image;
  }>;
  public get interColor(): SelectionObject<{
    id: string;
    name: string;
    img: Image;
  }> {
    return this._materials?.find((m) => m.groupName === 'Interior Trim Colors')
      .options;
  }

  //expose
  private _cars: SelectionObject<{
    scene: string;
    caption: string;
    sub_caption: string;
    img: string;
    img_mobile: string;
    backgroundColor: string;
    description: string;
  }> = {
    list: CARLIST,
    currentIndex: 0,
    func: (name: string) => {
      this._currentScene = name;
    },
    onChange: function (index: number) {
      this.currentIndex = index;
      this.func(this.list[index].scene);
    },
  };
  public get cars(): SelectionObject<{
    scene: string;
    caption: string;
    sub_caption: string;
    img: string;
    img_mobile: string;
    backgroundColor: string;
    description: string;
  }> {
    return this._cars;
  }

  //expose
  private _isExterior: boolean;
  public get isExterior(): boolean {
    return this._view === 'exterior';
  }

  //hook
  public setExteriorView() {
    this._view = 'exterior';
    this.basePlugin.changeStateByName('Exterior_desktop');
    this.onUpdate();
  }

  //expose
  private _isInterior: boolean;
  public get isInterior(): boolean {
    return this._view === 'interior';
  }

  //hook
  public setInteriorView() {
    this._view = 'interior';
    this.basePlugin.changeStateByName('Driver Seat');

    this.onUpdate();
  }

  //expose
  private _isNotDesign: boolean;
  public get isNotDesign(): boolean {
    return !(this._actionGroup === 'design');
  }

  //hook
  public setDesign() {
    this._actionGroup = 'design';
    this.onUpdate();
  }

  //expose
  private _isNotAnimation: boolean;
  public get isNotAnimation(): boolean {
    return !(this._actionGroup === 'animation');
  }

  //hook
  public setAnimation() {
    this._actionGroup = 'animation';
    this.onUpdate();
  }

  //expose
  private _isNotExterDesign: boolean;
  public get isNotExterDesign(): boolean {
    return !(this._view === 'exterior' && this._actionGroup === 'design');
  }

  //expose
  private _isNotExterAnimation: boolean;
  public get isNotExterAnimation(): boolean {
    return !(this._view === 'exterior' && this._actionGroup === 'animation');
  }

  //expose
  private _isNotInterDesign: boolean;
  public get isNotInterDesign(): boolean {
    return !(this._view === 'interior' && this._actionGroup === 'design');
  }

  //expose
  private _isNotInterAnimation: boolean;
  public get isNotInterAnimation(): boolean {
    return !(this._view === 'interior' && this._actionGroup === 'animation');
  }

  //expose
  private _isLightOn: boolean;
  public get isLightOn(): boolean {
    return this._light;
  }

  //hook
  public turnOnLight() {
    this._light = true;
    this.onUpdate();
  }

  //hook
  public turnOffLight() {
    this._light = false;
    this.onUpdate();
  }

  //expose
  private _isNotExterColor: boolean;
  public get isNotExterColor(): boolean {
    return !(
      this._activeExterDesign === 'color' &&
      this._view === 'exterior' &&
      this._actionGroup === 'design'
    );
  }

  //hook
  public setExterColor() {
    this._activeExterDesign = 'color';
    this.onUpdate();
  }

  //expose
  private _isNotExterEnv: boolean;
  public get isNotExterEnv(): boolean {
    return !(
      this._activeExterDesign === 'BG Colors' &&
      this._view === 'exterior' &&
      this._actionGroup === 'design'
    );
  }

  //hook
  public setExterEnv() {
    this._activeExterDesign = 'BG Colors';
    this.onUpdate();
  }

  //expose
  private _isNotExterWheel: boolean;
  public get isNotExterWheel(): boolean {
    return !(
      this._activeExterDesign === 'wheels' &&
      this._view === 'exterior' &&
      this._actionGroup === 'design'
    );
  }

  //hook
  public setExterWheel() {
    this._activeExterDesign = 'wheels';
    this.onUpdate();
  }

  //expose
  private _isNotInterColor: boolean;
  public get isNotInterColor(): boolean {
    return !(
      this._activeInterDesign === 'color' &&
      this._view === 'interior' &&
      this._actionGroup === 'design'
    );
  }

  //hook
  public setInterColor() {
    this._activeInterDesign = 'color';
    this.onUpdate();
  }

  //expose
  private _isNotInterEnv: boolean;
  public get isNotInterEnv(): boolean {
    return !(
      this._activeInterDesign === 'BG Colors' &&
      this._view === 'interior' &&
      this._actionGroup === 'design'
    );
  }

  //hook
  public setInterEnv() {
    this._activeInterDesign = 'BG Colors';
    this.onUpdate();
  }

  //expose
  private _isNotDriverSeat: boolean;
  public get isNotDriverSeat(): boolean {
    return !(this._seat === 'Driver Seat');
  }

  // hook
  public setDriverSeat() {}

  //expose
  private _isNotCoDriverSeat: boolean;
  public get isNotCoDriverSeat(): boolean {
    return !(this._seat === 'Co-Driver Seat');
  }

  //expose
  private _isNotBackSeatL: boolean;
  public get isNotBackSeatL(): boolean {
    return !(this._seat === 'Driver Seat');
  }

  //expose
  private _isNotBackSeatR: boolean;
  public get isNotBackSeatR(): boolean {
    return !(this._seat === 'Driver Seat');
  }

  //hook
  public async loadScene() {
    await this.basePlugin.loadSceneByName(this._currentScene);
    const load3D = () => {
      const data = this.basePlugin.get3DList();
      this._materials = data.materials;
      this._models = data.models;
    };
    load3D();
    console.log('3dList', this._currentScene, this.basePlugin.get3DList());
    this.refreshOnNewScene();
    this.onUpdate();
  }
}
