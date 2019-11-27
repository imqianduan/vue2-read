/**
 * VUE���캯�����
 */
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

/**
 * @param {*} options  new Vueʱ����Ĳ���
 */
function Vue (options) {
  // ����������������this����Vue��ʵ�������׳�����
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    // warn����ֻ�ڿ��������п��ã�������������Ϊһ���ղ������պ�����
    // ��'src\core\util\debug.js`�ж���
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // ִ�г�ʼ��
  // _init������'/core/instance/init.js'�ļ����ж���
  // ���ÿһ����Ⱦ�����ᴥ��'_init'��������ͨ��v-forѭ���������ÿѭ��һ�������������ִ��`_init`����
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
