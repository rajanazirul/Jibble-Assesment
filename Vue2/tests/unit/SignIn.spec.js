import { shallowMount } from '@vue/test-utils'
import SignIn from '../../src/components/SignIn/SignIn.vue'

describe('SignIn.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = '#DahDerma Donation platform that you can trust'
    const wrapper = shallowMount(SignIn, {
      propsData: { msg }
    })
    expect(wrapper.text()).toContain(msg)
  })
})
