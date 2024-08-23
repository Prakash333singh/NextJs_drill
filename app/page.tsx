import React from 'react'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export default function page() {
  return (
    <div className="container mx-auto p-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white rounded shadow-md p-4">
                  <h2 className="text-lg font-bold mb-2">hello</h2>
                  <p className="text-gray-600">Card content</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                <div className="bg-white rounded shadow-md p-4">
                  <h2 className="text-lg font-bold mb-2">Another card title</h2>
                  <p className="text-gray-600">More card content</p>
                </div>
              </div>
            </div>
          </div>
  )
}
